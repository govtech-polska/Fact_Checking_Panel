import React from 'react';
import { useTranslation } from 'react-i18next';

import { Paper, Typography, Link } from '@material-ui/core';
import styles from './Guide.module.scss';

const Guide = () => {
  const { i18n } = useTranslation();

  if (i18n.language !== 'pl') {
    return (
      <Paper className={styles.paper}>
        <Typography paragraph>
          English version of the guide is not available yet{' '}
          <span role="img" aria-label="">
            😔
          </span>
          .
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper className={styles.paper}>
      <Typography component="h2" variant="h5" paragraph>
        Przewodnik po systemie fact checkingu #FakeHunter i stylebook dla przygotowujących raporty fact checkingowe
      </Typography>
      <Typography component="h3" variant="h6" paragraph>
        Krótki przewodnik po systemie
      </Typography>
      <Typography paragraph>OGÓLNE ZASADY DZIAŁANIA SERWISU</Typography>
      <Typography paragraph>
        Użytkownik instaluje wtyczkę w swojej przeglądarce Chrome lub Firefox a następnie za jej pomocą zgłasza treści
        do systemu #FakeHunter.
      </Typography>
      <Typography paragraph>
        Do factcheckingu służy strona:{' '}
        <Link href="https://panel.app.fakehunter.pap.pl/">https://panel.app.fakehunter.pap.pl</Link>. To do niej loguje
        się zaproszony przez Admina użytkownik. Użytkownik może zmienić swoje hasło korzystając z emaila podawanego przy
        rejestracji.
      </Typography>
      <Typography paragraph>
        Użytkownik zgłaszający artykuły do systemu instaluje wtyczkę w swojej przeglądarce Chrome lub Firefox a
        następnie za jej pomocą zgłasza treści do systemu #FakeHunter.
      </Typography>
      <Typography paragraph>
        Zgłoszenie trafia do panelu aplikacji #FakeHunter i jest widoczne dla fact checkerów społecznościowych (I linia
        weryfikacji) i ekspertów (II linia weryfikacji).
      </Typography>
      <Typography paragraph>
        Zweryfikowane wiadomości (z co najmniej dwiema &quot;społecznymi&quot; opiniami PRAWDA lub FAKE NEWS albo z
        raportem eksperckim PAP, niezależnie od ocen ochotników), porządkowane według daty zgłoszenia, ukazują się
        tutaj: <Link href="https://app.fakehunter.pap.pl/">https://app.fakehunter.pap.pl/</Link>.
      </Typography>
      <Typography paragraph>
        Aplikacja #FakeHunter opiera się na transparentnych regułach, które są publikowane na stronie:{' '}
        <Link href="https://fakehunter.pap.pl/attachments/reguly_weryfikacji_faktow.pdf">
          <strong>Reguły weryfikacji faktów</strong>
        </Link>{' '}
        Ponieważ serwisowi #FakeHunter przyświeca zasada dążenia do prawdy a nie do obrony swojej racji za wszelką cenę
        stosujemy{' '}
        <strong>
          &quot;<Link href="https://fakehunter.pap.pl/attachments/polityka_korekt.pdf">Politykę korekt</Link>&quot;
        </strong>{' '}
        pozwalającą poprawiać i zmieniać werdykty według przejrzystych zasad.
      </Typography>
      <Typography paragraph>ZAKRES</Typography>
      <Typography paragraph>
        Obecnie głównym obszarem #FakeHunter są wątpliwe twierdzenia w internecie dotyczące epidemii Covid-19 (do tego
        jest oznaczenie: dotyczy/nie dotyczy koronawirusa). Docelowo projekt będzie poszerzany o nowe zagadnienia:
        gospodarcze, finansowe, społeczne.
      </Typography>
      <Typography paragraph>SELEKCJA</Typography>
      <Typography paragraph>
        Zgłoszenia w panelu #FakeHunter mogą być filtrowane wedle różnych kryteriów co ułatwia ich wyszukiwanie i
        sortowanie.
      </Typography>
      <Typography paragraph>
        {' '}
        Przesiewamy i obrabiamy zgłoszenia na bieżąco. W razie większego niż w okresie początkowym natężenia, kierujemy
        się kryteriami pilności, doniosłości, popularności itp. - mniej pilnym tekstom pozwalając poczekać ok. dwóch
        godzin, by ew. podjęli je ochotniczy factcheckerzy.
      </Typography>
      <Typography paragraph>
        Odrzucamy na wstępie materiały mające cechy spamu. Podobnie postępujemy ze zgłoszeniami obcojęzycznymi (choć
        sięgamy do źródeł międzynarodowych wedle potrzeby, zwłaszcza do czasopism naukowych i instytucji w rodzaju WHO).
        Skupiamy się na polskiej sieci.
      </Typography>
      <Typography paragraph>
        Kryterium sprawdzalności nie spełniają też teksty złożone z wielu pytań - nie prowadzimy Q&amp;A. Każdorazowo
        zajmujemy się konkretnym zapytaniem i problemem w zaznaczonym fragmencie tekstu - uważając jedynie, by nie
        poddać się w ten sposób manipulacji. Przykładowo jeśli pytanie dotyczy zastosowania jakiejś substancji w
        terapii, nawet jeśli można potwierdzić takie próby, odpowiedź nie powinna sugerować skuteczności, o ile nie ma
        na to niezależnych dowodów.
      </Typography>
      <Typography paragraph>
        Nie podejmujemy się też sprawdzania zgłoszeń, których odsyłacz jest nieaktywny lub prowadzi do zupełnie innych
        treści niż wskazane. Spośród zgłoszeń pochodzących z mediów społecznościowych zajmujemy się wyłącznie tymi,
        które mają status publikacji publicznie widocznej.
      </Typography>
      <Typography paragraph>
        Obecnie do odrzucania tekstów nie spełniających podstawowych kryteriów służy oznaczenie SPAM. Nie wymaga ono
        dodatkowego uzasadnienia z naszej strony. Z czasem może dojść nowa opcja &quot;nie nadaje się&quot;.
      </Typography>
      <Typography paragraph>
        Do wyjaśnienia: od początku programu powraca kwestia kryteriów rangi i zasięgu zgłoszeń, z postulatem odsiewania
        na tej podstawie (m.in. z obawy, że omawiając treści o małym wyjściowym zasięgu, podnosimy ich rangę i
        promujemy, zamiast zwalczać).
      </Typography>
      <Typography paragraph>EDYCJA I DROGA ZGŁOSZEŃ W SYSTEMIE</Typography>
      <Typography paragraph>
        Po kliknięciu w guzik &quot;Szczegóły&quot; wchodzimy na stronę zgłoszenia w panelu. Zarówno fake hunterzy
        społecznościowi jak eksperci II linii mają te same pola do zaznaczenia i wypełnienia. Strona zgłoszenia w panelu
        zawiera: opis zgłoszenia, screen zgłaszanej strony, komentarz zgłaszającego użytkownika internetu, zaznaczony
        fragment i adres URL prowadzący do zgłaszanej strony.
      </Typography>
      <Typography paragraph>
        Strona zgłoszenia zawiera również formularz do wprowadzania werdyktu i jego uzasadnienia oraz wiarygodnych
        źródeł na których fact checker (fake hunter społecznościowy, ekspert PAP lub ekspert specjalista) opiera swój
        werdykt.
      </Typography>
      <Typography paragraph>
        Po zaznaczeniu werdyktu i wypełnieniu pól formularza, fact checker klika w guzik &quot;Zweryfikuj
        zgłoszenie&quot;, co oznacza wprowadzenie raportu fact checkingowego do systemu. W przypadku eksperta PAP i
        eksperta-specjalisty – publikację.
      </Typography>
      <Typography paragraph>
        Fake hunterzy społecznościowi (I linii) nie widzą wszystkich zgłoszeń wpadających do systemu, lecz tylko te,
        które losowo są im przydzielane (jest to zautomatyzowane). W przypadku dwóch zgodnych werdyktów fact checkerów
        społecznościowych raport fact checkingowy ukazuje się na stronie z następującym komunikatem: „Zgłoszenie
        oczekuje na werdykt eksperta PAP&quot;.
      </Typography>
      <Typography paragraph>
        W drugiej linii zgłoszenie podejmują eksperci PAP i eksperci-specjaliści. Ich werdykt jest ostateczny. Jeśli
        jest niezgodny z werdyktami fact checkerów społecznościowych, ich raporty znikają. Jeśli jest zgodny, to są
        pozostawiane na stronie.
      </Typography>
      <Typography paragraph>
        Po wypełnieniu przez eksperta formularza w panelu #FakeHunter i zaznaczeniu weryfikacji zgłoszenia na stronie
        app.fakehunter.pap.pl ukazuje się raport fact checkingowy.
      </Typography>
      <Typography paragraph>RAPORTY</Typography>
      <Typography paragraph>
        Raporty tytułujemy w formie zapytania streszczającego lapidarnie przedmiot fact checkingu. Pierwszy akapit
        tekstu uzasadnienia powinien już w pierwszych słowach informować o werdykcie. W swoich ustaleniach eksperci nie
        odnoszą się i nie sugerują opiniami ochotników. Pod własnym raportem, jeśli chcą, podpisują się, używając
        inicjałów (jak w depeszach PAP).
      </Typography>
      <Typography paragraph>
        Dla bezpieczeństwa danych (np. na wypadek nagłej awarii czy przypadkowego zamknięcia okna przeglądarki)
        najlepiej przygotowywać i regularnie zapisywać raporty w edytorze tekstu, np. w Wordzie.
      </Typography>
      <Typography paragraph>
        Pod tekstem we wskazanym polu wskazujemy i opisujemy każdorazowo wszystkie wykorzystane źródła z podaniem daty
        dostępu do nich, a także, jeśli jest dostępna, daty publikacji danego doniesienia, artykułu czy odpowiedzi (lub
        kopii odzyskanej z archiwum internetowego). Pozwala to osadzić sprawę w czasie i wprowadzić ew. zmiany w razie
        konieczności czy nowych informacji w późniejszym terminie.
      </Typography>
      <Typography paragraph>
        Przed publikacją raportu eksperckiego staramy się korzystać z systemu drugiego oka, korygującego drobne, ale
        również poważniejsze błędy. W miarę możliwości druga osoba pełniąca dyżur powinna przejrzeć spisany raport pod
        kątem np. literówek lub niejasności.
      </Typography>
      <Typography paragraph>ŹRÓDŁA I NARZĘDZIA</Typography>
      <Typography paragraph>
        Nie powołujemy się na inne media jeśli to możliwe, choć korzystamy z depeszy PAP. Przede wszystkim bazujemy
        jednak na źródłach naukowych i instytucjonalnych, np.:
        <ol>
          <li>
            polskie rządowe:
            <br />
            <Link href="https://www.gov.pl/web/zdrowie/">https://www.gov.pl/web/zdrowie/</Link>
            <Link href="https://www.gov.pl/web/koronawirus">https://www.gov.pl/web/koronawirus</Link>
          </li>
          <li>
            Światowa Organizacja Zdrowia:
            <br />
            <Link href="https://www.who.int/emergencies/diseases/novel-coronavirus-2019/">
              https://www.who.int/emergencies/diseases/novel-coronavirus-2019/
            </Link>
            <Link href="https://www.who.int/health-topics/coronavirus">
              https://www.who.int/health-topics/coronavirus
            </Link>
            <Link href="https://www.who.int/news-room/q-a-detail/q-a-coronaviruses">
              https://www.who.int/news-room/q-a-detail/q-a-coronaviruses
            </Link>
          </li>
          <li>
            inne:
            <br />
            <Link href="https://coronavirus.jhu.edu">https://coronavirus.jhu.edu</Link>
            <Link href="https://www.cdc.gov/coronavirus/2019-ncov/index.html">
              https://www.cdc.gov/coronavirus/2019-ncov/index.html
            </Link>
            <Link href="https://www.ecdc.europa.eu/en/geographical-distribution-2019-ncov-cases">
              https://www.ecdc.europa.eu/en/geographical-distribution-2019-ncov-cases
            </Link>
            <Link href="https://experience.arcgis.com/experience/685d0ace521648f8a5beeeee1b9125cd">
              https://experience.arcgis.com/experience/685d0ace521648f8a5beeeee1b9125cd
            </Link>
          </li>
        </ol>
        Do factcheckingu wedle potrzeby stosujemy także inne dostępne narzędzia, w tym zwłaszcza wyszukiwanie obrazu w
        Google, archiwa internetowe (np. Wayback Machine) oraz pomocniczo - raporty innych instytucji zajmujących się
        debunkowaniem fake newsów, np. factcheck.org, factcheck.afp.com, politifact.com - głównie żeby zorientować się
        co do źródeł i podejść do danego tematu. Nie przepisujemy jednak werdyktów.
      </Typography>
      <Typography paragraph>DYŻURY</Typography>
      <Typography paragraph>
        Pracujemy codziennie (w tym w weekendy i święta) zgodnie z miesięcznym grafikiem dyżurów, w systemie
        dwuzmianowym: 8-15 i 15-22. W czasie dyżurów korzystamy z kanału na Slacku: PAP Fake Hunters.
      </Typography>
      <Typography paragraph>
        Zgłoszenia wymagające bezpośredniego komentarza instytucjonalnego, jeśli trafią się wieczorem, zostają
        przekazane dla zmiany rannej, która ma możliwość zadzwonienia. Zmiana wieczorna może w takim wypadku przygotować
        i wysłać maila z zapytaniem, przekazując informację o sprawie dalej. Sprawy nie dające się zamknąć na danej
        zmianie lub których nie można się na razie podjąć, np. oczekujące na komentarz zewnętrzny, linkujemy na Slacku w
        osobnej zakładce: &quot;Oczekujące&quot;
      </Typography>
      <Typography paragraph>BŁĘDY I SUGESTIE</Typography>
      <Typography paragraph>
        W przypadku wystąpienia błędu lub problemów z systemem (np. logowaniem itp.), zgłoszenia kierujemy do
        developerów przez formularz: Wyślij opinię (czerwona ramka, wyświetla się w prawym dolnym rogu na wszystkich
        stronach app.fakehunter.pap.pl).
      </Typography>
      <Typography paragraph>
        Ogólniejsze spostrzeżenia oraz propozycje zmian w aplikacji zbieramy na interaktywnej tablicy Trello:{' '}
        <Link href="https://trello.com/invite/b/KpWsLprI/2e01652b8de65d558949e5df25a6f1d3/welcome-board">
          https://trello.com/invite/b/KpWsLprI/2e01652b8de65d558949e5df25a6f1d3/welcome-board
        </Link>
      </Typography>
      <Typography component="h3" variant="h6" paragraph>
        #FakeHunter Stylebook
      </Typography>
      <Typography paragraph>TYTUŁ</Typography>
      <Typography paragraph>
        Tytuł to fake, który demontujemy w formie krótkiego pytania. Kluczowa sprawa, którą rozstrzygamy.
      </Typography>
      <Typography paragraph>
        Na przykład:
        <ul>
          <li>Czy szpitale w USA manipulują wynikami?</li>
        </ul>
        Niech to będzie gramatyczne, proste, logiczne pytanie. Dlatego nie piszmy:
        <ul>
          <li>Naprawdę palacze są bardziej odporni na koronawirusa?</li>
        </ul>
        Bo nie pytamy, o to czy &quot;naprawdę&quot;, tylko czy palacze są bardziej odporni. Pytanie zadajemy w formie
        jak najprostszego zdania pytającego: Czy… ? A więc o palaczy powinniśmy zapytać np:
        <ul>
          <li>Czy papierosy chronią przed koronwirusem?</li>
        </ul>
        albo
        <ul>
          <li>Czy palacze są bardziej odporni na koronawirusa?</li>
        </ul>
        Pamiętamy, że pytania w tytule powinien kończyć znak zapytania. Wielka prośba o dbałość o to.
      </Typography>
      <Typography paragraph>
        Dementujemy (lub potwierdzamy konkretną informację, a nie artykuł czy jakiś ciąg logiczny), a więc w tytule nie
        powinno być &quot;Czy jest szczepionka na koronawirusa? Czy pandemia COVID-19 to jedno wielkie oszustwo?&quot;
        tylko &quot;Czy jest szczepionka na koronawirusa?&quot; Ewentualnie pandemia COVID-19 jako oszustwo może być
        drugim demontowanym doniesieniem, w innej notce.
      </Typography>
      <Typography paragraph>PIERWSZY AKAPIT UZASADNIENIA</Typography>
      <Typography paragraph>
        Nie powinien być wyrwanym fragmentem kończącym się wielokropkiem, a zwartym tekstem kończącym kropką i
        zawierającym clue raportu, jego skrót. Być tym, czym w artykule lead – kwintesencją. Czyli powinien zawierać,
        się - z tego co zauważyłem – w około 180 znakach ze spacjami.
      </Typography>
      <Typography paragraph>Tekst powinien zawierać – co zawiera fake, skąd pochodzi i jaka jest odpowiedź.</Typography>
      <Typography paragraph>Czyli na przykład zamiast:</Typography>
      <Typography paragraph>
        &quot;Wymazówka to zazwyczaj zamknięta w szczelnej próbówce plastikowa pałeczka owinięta na jednym z końców
        wyjałowionym materiałem. Służy ona do pobierania płynów fizjologicznych, wydzielin określonego nar...&quot;
      </Typography>
      <Typography paragraph>piszemy np:</Typography>
      <Typography paragraph>
        &quot;Poseł XX na Twitterze zasugerował, że wymazówka jest testem na koronawirusa. To nieprawda. Wymazówka służy
        pobieraniu materiału do testu.&quot;
      </Typography>
      <Typography paragraph>albo zamiast:</Typography>
      <Typography paragraph>
        &quot;Od pewnego czasu w sieci krążą artykuły i wypowiedzi Tomasza Dorniaka, który twierdzi, że ma skuteczny
        sposób leczenia a raczej niszczenia korona wirusa na poziomie komórkowym. Jako skuteczną podaje t...&quot;
      </Typography>
      <Typography paragraph>piszemy:</Typography>
      <Typography paragraph>
        &quot;Tomasz Dorniak w internetowych publikacjach twierdzi, że lek NanoAstrax leczy koronawirusa. Nie ma na to
        żadnego naukowego potwierdzenia. Leku wciąż nie ma.&quot;
      </Typography>
      <Typography paragraph>STYLISTYKA</Typography>
      <Typography paragraph>
        We wszystkich tych sekcjach:
        <ul>
          <li>
            zwracamy uwagę na kropki, przecinki, właściwą interpunkcję. To nie jest medium społecznościowe, komunikator
            ani narzędzie backoffice&#39;owe. Wymaga takiej samej staranności jak strona główna portalu PAP czy serwis
            agencyjny.
          </li>
          <li>
            Unikamy własnej publicystyki, komentarzy, sformułowań nacechowanych emocjonalnie. Zamiast pisać, że „ktoś
            najwyraźniej uważa&quot;, piszemy „że ktoś sugeruje&quot;, ale najlepiej byśmy opierali się wyłącznie na
            twardych faktach, czyli ktoś „napisał&quot;, „stwierdził&quot;, „podał&quot;. Unikamy przymiotników typu
            „rzekomy&quot;, „kłamliwy&quot;, sam factcheck ma na to wskazać (albo nie).
          </li>
        </ul>
      </Typography>
    </Paper>
  );
};

export default Guide;
