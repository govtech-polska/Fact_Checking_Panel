import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useWindowSize } from '@react-hook/window-size/throttled';
import { Modal, Button, ButtonGroup, Tooltip } from '@material-ui/core';
import BrushIcon from '@material-ui/icons/Brush';
import OpenWithIcon from '@material-ui/icons/OpenWith';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';

import { adminActions } from 'storages/admin/actions';
import Alert from 'components/Alert';
import Editor from './editor';

import styles from './ImageEditor.module.scss';

const ACTIONS_HEIGHT = 80;
const MARGIN = 16;
const MODES = {
  PAINT: 'PAINT',
  EDIT: 'EDIT',
  REMOVE: 'REMOVE'
};

const ImageEditor = ({ image, isOpen, onClose }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { imageUploadState } = useSelector(({ admin }) => ({
    imageUploadState: admin.edit.image
  }));
  const [width, height] = useWindowSize();
  const [canvas, setCanvas] = useState(null);
  const [editor, setEditor] = useState(null);
  const [showBorders, setShowBorders] = useState(true);
  const [mode, setMode] = useState(MODES.PAINT);

  useEffect(() => {
    /*
     * Wait for canvas render and use state too keep ref to it
     * It's workaround because with useRef is attached to node which is render conditionally
     * the node is not available on first render and there is not information when it changes
     */
    const observer = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        if (!mutation.addedNodes) return;
        for (var i = 0; i < mutation.addedNodes.length; i++) {
          const node = mutation.addedNodes[i];
          if (node.nodeType === Node.ELEMENT_NODE) {
            const canvasNode = node.querySelector('#image-editor-canvas');
            if (canvasNode) {
              setCanvas(canvasNode);
            }
          }
        }
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: false,
      characterData: false
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (canvas) {
      const maxWidth = width - 2 * MARGIN;
      const maxHeight = height - 3 * MARGIN - ACTIONS_HEIGHT;
      setEditor(new Editor(canvas, maxWidth, maxHeight));
    }
  }, [canvas, width, height]);

  useEffect(() => {
    if (!editor) {
      return;
    }

    const handleImageLoad = () => {
      editor.addImage(img);
    };

    const img = new Image();
    img.addEventListener('load', handleImageLoad, false);
    img.crossOrigin = 'Anonymous';
    img.src = `${image}?${Date.now()}`; // TODO: Temporary cache workaround

    return () => {
      img.removeEventListener('load', handleImageLoad);
    };
  }, [image, editor]);

  const handleMouseDown = e => {
    if (!editor) {
      return;
    }
    if (mode === MODES.PAINT) {
      editor.startDrawing(e);
    }
    if (mode === MODES.EDIT) {
      editor.startMoving(e);
    }
    if (mode === MODES.REMOVE) {
      editor.remove(e);
    }
  };

  const handleMouseUp = e => {
    if (!editor) {
      return;
    }
    if (mode === MODES.PAINT) {
      editor.stopDrawing(e);
    }
    if (mode === MODES.EDIT) {
      editor.stopMoving(e);
    }
  };

  const handleMouseMove = e => {
    if (!editor) {
      return;
    }
    if (mode === MODES.PAINT) {
      editor.draw(e);
    }
    if (mode === MODES.EDIT) {
      editor.move(e);
    }
    if (mode === MODES.REMOVE) {
      editor.highlight(e);
    }
  };

  const updateImage = () => {
    editor.getCanvasToSave(
      () =>
        new Promise(resolve => {
          canvas.toBlob(blob => {
            resolve();
            const formData = new FormData();
            formData.append('image', blob, `${id}.png`);

            dispatch(adminActions.edit.image(id, formData));
          });
        })
    );
  };

  const downloadImage = () => {
    editor.getCanvasToSave(
      () =>
        new Promise(resolve => {
          const link = document.createElement('a');
          link.download = `${id}.png`;
          link.href = canvas.toDataURL();
          link.click();
          resolve();
        })
    );
  };

  const toggleBorders = () => {
    setShowBorders(!showBorders);
    editor.showBorders(!showBorders);
  };

  const changeMode = nextMode => () => {
    setMode(nextMode);
  };

  const getIconColor = modeType => (modeType === mode ? 'primary' : 'default');

  return (
    <Modal open={isOpen} onClose={onClose}>
      <div className={styles.wrapper}>
        <canvas
          id="image-editor-canvas"
          style={{ margin: MARGIN }}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
        />
        <Alert showOn={imageUploadState.error} withMargin>
          {imageUploadState.error}
        </Alert>
        <div className={styles.actions}>
          <ButtonGroup variant="contained" className={styles.buttons}>
            <Button onClick={onClose}>Wyjdź</Button>
          </ButtonGroup>
          <ButtonGroup variant="contained" className={styles.buttons}>
            <Tooltip title="Rysowanie">
              <Button color={getIconColor(MODES.PAINT)} onClick={changeMode(MODES.PAINT)}>
                <BrushIcon />
              </Button>
            </Tooltip>

            <Tooltip title="Przesuwanie">
              <Button color={getIconColor(MODES.EDIT)} onClick={changeMode(MODES.EDIT)}>
                <OpenWithIcon />
              </Button>
            </Tooltip>

            <Tooltip title="Usuwanie">
              <Button color={getIconColor(MODES.REMOVE)} onClick={changeMode(MODES.REMOVE)}>
                <DeleteOutlineIcon />
              </Button>
            </Tooltip>

            <Tooltip title={showBorders ? 'Ukryj obramowania pomocniczne' : 'Pokaż obramowania pomocnicze'}>
              <Button onClick={toggleBorders}>{showBorders ? <VisibilityIcon /> : <VisibilityOffIcon />}</Button>
            </Tooltip>
          </ButtonGroup>
          <ButtonGroup variant="contained" className={styles.buttons} disabled={imageUploadState.isFetching}>
            <Button onClick={updateImage}>Zapisz</Button>
            <Button onClick={downloadImage}>Pobierz</Button>
          </ButtonGroup>
        </div>
      </div>
    </Modal>
  );
};

ImageEditor.propTypes = {
  image: PropTypes.string,
  isOpen: PropTypes.bool,
  onClose: PropTypes.func
};

export default ImageEditor;
