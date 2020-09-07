import * as StackBlur from 'stackblur-canvas';

const getPureRectPos = (start, final) => {
  const w = final.x - start.x;
  const h = final.y - start.y;

  return {
    x: w < 0 ? start.x + w : start.x,
    y: h < 0 ? start.y + h : start.y,
    w: Math.abs(w),
    h: Math.abs(h)
  };
};

const getFocusedOverlayIndex = (overlays, mousePosition) => {
  const index = [...overlays].reverse().findIndex(overlay => {
    const rect = getPureRectPos(overlay.start, overlay.final);

    if (mousePosition.x > rect.x && mousePosition.x < rect.x + rect.w) {
      if (mousePosition.y > rect.y && mousePosition.y < rect.y + rect.h) {
        return true;
      }
    }
    return false;
  });
  return overlays.length - index - 1;
};

class Editor {
  img = null;
  blurredImg = null;
  canvas = null;
  ctx = null;
  width = 0;
  height = 0;

  overlays = [];
  drawingIndex = -1;
  highlightIndex = -1;
  movingIndex = -1;
  movingAnchor = {
    x: 0,
    y: 0
  };
  isMoving = false;
  isBorder = true;

  constructor(canvas, width, height) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.width = width;
    this.height = height;
  }

  addImage(img) {
    const ratio = Math.min(this.width / img.width, this.height / img.height);
    this.canvas.width = img.width * ratio;
    this.canvas.height = img.height * ratio;
    this.img = img;

    this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
    StackBlur.canvasRGB(this.canvas, 0, 0, this.canvas.width, this.canvas.height, 23);
    this.blurredImg = new Image();
    this.blurredImg.src = this.canvas.toDataURL('image/png');
    this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
  }

  startDrawing(event) {
    const startPoint = this.getMousePosition(event);
    this.overlays.push({
      start: startPoint,
      final: {
        x: 0,
        y: 0
      }
    });
    this.drawingIndex = this.overlays.length - 1;
  }

  stopDrawing(event) {
    const finalPoint = this.getMousePosition(event);
    this.overlays[this.drawingIndex] = {
      ...this.overlays[this.drawingIndex],
      final: finalPoint
    };
    this.drawingIndex = -1;
    this.repaint();
  }

  draw(event) {
    if (this.drawingIndex !== -1) {
      const finalPoint = this.getMousePosition(event);

      this.overlays[this.drawingIndex] = {
        ...this.overlays[this.drawingIndex],
        final: finalPoint
      };

      this.repaint();
    }
  }

  startMoving(event) {
    const pos = this.getMousePosition(event);
    const index = getFocusedOverlayIndex(this.overlays, pos);
    const touched = this.overlays[index];
    if (touched) {
      const rect = getPureRectPos(touched.start, touched.final);
      this.movingIndex = index;
      this.movingAnchor = {
        x: pos.x - rect.x,
        y: pos.y - rect.y
      };
      this.isMoving = true;
      this.repaint();
    }
  }

  stopMoving() {
    this.isMoving = false;
    this.movingIndex = -1;
    this.repaint();
  }

  move(event) {
    if (this.isMoving) {
      const pos = this.getMousePosition(event);
      const touched = this.overlays[this.movingIndex];
      const rect = getPureRectPos(touched.start, touched.final);
      this.overlays[this.movingIndex] = {
        ...touched,
        start: {
          x: pos.x - this.movingAnchor.x,
          y: pos.y - this.movingAnchor.y
        },
        final: {
          x: pos.x - this.movingAnchor.x + rect.w,
          y: pos.y - this.movingAnchor.y + rect.h
        }
      };
      this.repaint();
    } else {
      this.highlight(event);
    }
  }

  highlight(event) {
    const pos = this.getMousePosition(event);
    const index = getFocusedOverlayIndex(this.overlays, pos);
    const prevIndex = this.highlightIndex;
    this.highlightIndex = index;

    if (prevIndex !== index) {
      this.repaint();
    }
  }

  remove(event) {
    const pos = this.getMousePosition(event);
    const index = getFocusedOverlayIndex(this.overlays, pos);
    if (index > -1) {
      this.overlays.splice(index, 1);
    }
    this.highlightIndex = -1;
    this.repaint();
  }

  showBorders(nextState) {
    this.isBorder = nextState;
    this.repaint();
  }

  repaint() {
    requestAnimationFrame(this.paint.bind(this));
  }

  paint() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.drawImage(this.blurredImg, 0, 0, this.canvas.width, this.canvas.height);

    const blurs = this.overlays.map(overlay => {
      const rect = getPureRectPos(overlay.start, overlay.final);
      const imageData = this.ctx.getImageData(rect.x, rect.y, rect.w || 1, rect.h || 1);

      return {
        imageData,
        x: rect.x,
        y: rect.y,
        w: rect.w,
        h: rect.h
      };
    });

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.drawImage(this.img, 0, 0, this.canvas.width, this.canvas.height);

    this.ctx.fillStyle = '#000000';
    this.ctx.strokeStyle = '#000000';
    this.ctx.lineWidth = 0;

    blurs.forEach((blur, i) => {
      this.ctx.putImageData(blur.imageData, blur.x, blur.y);
      this.ctx.setLineDash([8, 5]);

      if (this.isBorder) {
        switch (i) {
          case this.drawingIndex: {
            break;
          }
          case this.movingIndex: {
            this.ctx.lineWidth = 2;
            this.ctx.strokeStyle = '#ff8400';
            this.ctx.setLineDash([]);
            this.ctx.strokeRect(blur.x, blur.y, blur.w, blur.h);
            break;
          }
          case this.highlightIndex: {
            this.ctx.lineWidth = 2;
            this.ctx.strokeStyle = '#FF0000';
            this.ctx.strokeRect(blur.x, blur.y, blur.w, blur.h);
            break;
          }
          default: {
            this.ctx.lineWidth = 2;
            this.ctx.strokeStyle = '#000000';
            this.ctx.strokeRect(blur.x, blur.y, blur.w, blur.h);
          }
        }
      }
    });
  }

  async getCanvasToSave(callback) {
    const prevBorder = this.isBorder;
    this.showBorders(false);
    this.paint();

    await callback(this.canvas);

    this.showBorders(prevBorder);
  }

  getMousePosition(event) {
    const rect = this.canvas.getBoundingClientRect();
    const scaleX = this.canvas.width / rect.width;
    const scaleY = this.canvas.height / rect.height;

    return {
      x: (event.clientX - rect.left) * scaleX,
      y: (event.clientY - rect.top) * scaleY
    };
  }
}

export default Editor;
