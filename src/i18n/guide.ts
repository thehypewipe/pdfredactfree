// src/i18n/guide.ts
import type { SupportedLocale } from './ui';

export interface GuideStep {
  title: string;
  desc: string;
}

export interface GuideChecklistItem {
  title: string;
  desc: string;
}

export interface GuideFaqItem {
  q: string;
  a: string;
}

export interface GuideToc {
  title: string;
  tool: string;
  guide: string;
  comparison: string;
  checklist: string;
  faq: string;
  ctaTitle: string;
  ctaBtn: string;
}

export interface GuideContent {
  eyebrow: string;
  title: string;
  intro: string;
  calloutTitle: string;
  calloutText: string;
  stepsTitle: string;
  steps: GuideStep[];
  tableTitle: string;
  tableHeaders: [string, string, string, string];
  tableRows: [string, string, string, string][];
  checklistTitle: string;
  checklist: GuideChecklistItem[];
  faqTitle: string;
  faqList: GuideFaqItem[];
  toc: GuideToc;
}

export const GUIDE_TRANSLATIONS: Record<SupportedLocale, GuideContent> = {
  "en": {
    "eyebrow": "Complete Guide",
    "title": "How to Permanently Black Out Text in a PDF Without Adobe Pro",
    "intro": "When dealing with sensitive documents — bank statements, tax returns, contracts, medical records, or government IDs — redacting private information before sharing is not optional. However, most users default to methods that are either expensive (Adobe Acrobat Pro subscriptions) or dangerously ineffective (drawing black highlighter lines in basic viewers).",
    "calloutTitle": "The Black Highlighter Trap",
    "calloutText": "Using a black markup brush or highlighter tool in standard PDF viewers does not redact text. The underlying text remains completely intact in the document layer and can be selected, searched, or revealed by simply copying the text or removing the overlay shape.",
    "stepsTitle": "Step-by-Step: True PDF Redaction in Your Browser",
    "steps": [
      {
        "title": "Select or drop your PDF",
        "desc": "Drag and drop your file into the dropzone above, or click to browse. Your file is processed 100% locally in your browser memory — nothing is ever transmitted over the network."
      },
      {
        "title": "Draw blackout boxes",
        "desc": "Click and drag with your mouse (or drag with a single finger on touch screens) to place solid black redaction boxes over sensitive text, numbers, or images. You can resize, adjust, or delete any box before finalizing."
      },
      {
        "title": "Navigate multiple pages",
        "desc": "Use the page indicator or arrow buttons to jump between pages and redact every occurrence of confidential information across the entire document."
      },
      {
        "title": "Download permanent redacted PDF",
        "desc": "Click Download PDF. The tool uses pdf-lib to burn opaque vector rectangles directly into the PDF coordinate space, permanently destroying the underlying text stream."
      }
    ],
    "tableTitle": "Vector Redaction vs. Visual Overlays: The Crucial Difference",
    "tableHeaders": [
      "Feature",
      "PDF Redact Free",
      "Black Highlighter",
      "Adobe Acrobat Pro"
    ],
    "tableRows": [
      [
        "Text un-selectable?",
        "Yes (Permanently)",
        "No (Copyable)",
        "Yes"
      ],
      [
        "File leaves device?",
        "Never (100% Client)",
        "Varies",
        "Cloud-synced"
      ],
      [
        "Cost",
        "Free Forever",
        "Free",
        "$239/year"
      ],
      [
        "No sign-up required",
        "Yes",
        "Yes",
        "Requires Account"
      ],
      [
        "Mobile support",
        "iOS & Android",
        "App needed",
        "App needed"
      ]
    ],
    "checklistTitle": "What Information Must Always Be Redacted?",
    "checklist": [
      {
        "title": "Government Identification",
        "desc": "Social Security numbers (SSNs), passport numbers, driver's license numbers, and national insurance identifiers."
      },
      {
        "title": "Financial Data",
        "desc": "Bank account numbers, routing codes, credit card numbers, CVVs, and IBANs."
      },
      {
        "title": "Contact & Personal Info",
        "desc": "Home addresses, personal phone numbers, dates of birth, and mother's maiden names."
      },
      {
        "title": "Medical Records",
        "desc": "Patient health information (PHI), diagnosis codes, and prescription histories governed by HIPAA."
      },
      {
        "title": "Proprietary Business Data",
        "desc": "Trade secrets, pricing terms, non-public client lists, and confidential settlement amounts."
      }
    ],
    "faqTitle": "Frequently Asked Questions",
    "faqList": [
      {
        "q": "How do you redact a PDF online for free with no sign up?",
        "a": "Upload your PDF to PDF Redact Free, draw black vector boxes over sensitive data, and click Download. The entire process runs locally in your browser with zero registration, zero accounts, and zero cloud uploads."
      },
      {
        "q": "How to black out text in a PDF without Adobe Acrobat Pro?",
        "a": "PDF Redact Free provides a free vector redaction tool in your browser. It permanently burns solid black rectangles over text coordinates so data cannot be selected, copied, or uncovered, eliminating the need for expensive software subscriptions."
      },
      {
        "q": "Can someone see under blacked-out text in a PDF?",
        "a": "Not when using true vector redaction. Unlike visual black highlights that only change background color, PDF Redact Free places permanent, opaque vector layers directly into the PDF syntax, making the underlying text completely inaccessible."
      },
      {
        "q": "Is this PDF redactor safe for bank statements, SSNs, and tax forms?",
        "a": "Yes. PDF Redact Free operates entirely on client-side WebAssembly and JavaScript. Your documents never get uploaded to any external server or cloud storage, guaranteeing complete confidentiality."
      },
      {
        "q": "Why is black highlighter not safe for redacting PDFs?",
        "a": "Black highlighter in PDF editors only adds a visual layer on top of the text. The underlying text remains fully selectable and searchable in the PDF file structure. Anyone can remove the highlight layer to expose the original data. True vector redaction overwrites the coordinates with opaque black rectangles burned into the document."
      }
    ],
    "toc": {
      "title": "On This Page",
      "tool": "PDF Redactor Tool",
      "guide": "Step-by-Step Guide",
      "comparison": "Vector vs Highlighter",
      "checklist": "Sensitive Data Checklist",
      "faq": "FAQ",
      "ctaTitle": "Need to redact now?",
      "ctaBtn": "Redact PDF — Free"
    }
  },
  "es": {
    "eyebrow": "Guía Completa",
    "title": "Cómo censurar y tachar texto en un PDF de forma permanente sin Adobe Pro",
    "intro": "Al manipular documentos confidenciales — extractos bancarios, declaraciones de impuestos, contratos, historiales médicos o identificaciones — censurar la información privada antes de compartirla es indispensable. La mayoría recurre a costosas suscripciones de Adobe Acrobat Pro o comete el peligroso error de dibujar líneas con resaltadores negros en visores básicos.",
    "calloutTitle": "La trampa del marcador negro",
    "calloutText": "Usar un pincel o herramienta de resaltado negro en visores de PDF estándar NO elimina el texto. El texto subyacente permanece intacto en la capa del documento y puede seleccionarse, buscarse o revelarse simplemente copiando el texto o eliminando la figura superpuesta.",
    "stepsTitle": "Paso a paso: Verdadera redacción de PDF en su navegador",
    "steps": [
      {
        "title": "Seleccione o arrastre su PDF",
        "desc": "Arrastre y suelte su archivo en la zona superior o haga clic para buscarlo. Su archivo se procesa 100% de forma local en la memoria del navegador; nada se envía por la red."
      },
      {
        "title": "Dibuje cuadros de censura",
        "desc": "Haga clic y arrastre con el ratón (o deslice 1 dedo en pantallas táctiles) para colocar cajas negras opacas sobre texto, números o imágenes confidenciales. Puede redimensionar o eliminar cualquier caja antes de finalizar."
      },
      {
        "title": "Navegue entre múltiples páginas",
        "desc": "Utilice los controles de página para desplazarse y tachar cada dato confidencial a lo largo de todo el documento."
      },
      {
        "title": "Descargue su PDF censurado permanente",
        "desc": "Haga clic en Descargar PDF. La herramienta graba rectángulos vectoriales opacos directamente en las coordenadas del PDF, destruyendo permanentemente el texto subyacente."
      }
    ],
    "tableTitle": "Redacción vectorial vs. Resaltado visual: La diferencia crucial",
    "tableHeaders": [
      "Característica",
      "PDF Redact Free",
      "Resaltador Negro",
      "Adobe Acrobat Pro"
    ],
    "tableRows": [
      [
        "¿Texto no seleccionable?",
        "Sí (Permanente)",
        "No (Copiable)",
        "Sí"
      ],
      [
        "¿El archivo sale del equipo?",
        "Nunca (100% Local)",
        "Variable",
        "Sincronizado en nube"
      ],
      [
        "Costo",
        "Gratis para siempre",
        "Gratis",
        "$239/año"
      ],
      [
        "Sin registro requerido",
        "Sí",
        "Sí",
        "Requiere cuenta"
      ],
      [
        "Soporte en móviles",
        "iOS y Android",
        "Requiere app",
        "Requiere app"
      ]
    ],
    "checklistTitle": "¿Qué información debe censurarse siempre?",
    "checklist": [
      {
        "title": "Identificaciones gubernamentales",
        "desc": "Números de seguridad social (SSN), pasaportes, licencias de conducir y números de identificación fiscal."
      },
      {
        "title": "Datos financieros",
        "desc": "Números de cuentas bancarias, códigos de ruta (routing), números de tarjetas de crédito, CVV e IBAN."
      },
      {
        "title": "Contacto y datos personales",
        "desc": "Direcciones residenciales, números telefónicos privados, fechas de nacimiento y apellidos maternos."
      },
      {
        "title": "Historiales médicos",
        "desc": "Información de salud del paciente (PHI), diagnósticos clínicos y prescripciones médicas protegidas por leyes de privacidad."
      },
      {
        "title": "Información comercial confidencial",
        "desc": "Secretos comerciales, términos de precios, listas privadas de clientes y montos de acuerdos legales."
      }
    ],
    "faqTitle": "Preguntas Frecuentes",
    "faqList": [
      {
        "q": "¿Cómo censurar un PDF online gratis sin registro?",
        "a": "Suba su PDF a PDF Redact Free, dibuje cajas vectoriales negras sobre los datos sensibles y haga clic en Descargar. Todo el proceso se ejecuta localmente en su navegador sin registros ni cargas en la nube."
      },
      {
        "q": "¿Cómo tachar texto en un PDF sin Adobe Acrobat Pro?",
        "a": "PDF Redact Free ofrece una herramienta de censura vectorial gratuita en su navegador que graba rectángulos negros permanentes sobre las coordenadas del texto, evitando costosas suscripciones."
      },
      {
        "q": "¿Se puede ver lo que hay debajo del texto tachado en un PDF?",
        "a": "No cuando se utiliza verdadera redacción vectorial. A diferencia de los resaltados negros que solo cambian el color de fondo, PDF Redact Free incrusta capas vectoriales opacas en la estructura del PDF."
      },
      {
        "q": "¿Es seguro este redactor de PDF para extractos bancarios y declaraciones?",
        "a": "Sí. PDF Redact Free funciona completamente con WebAssembly y JavaScript del lado del cliente. Sus documentos jamás se cargan en ningún servidor externo."
      },
      {
        "q": "¿Por qué el marcador negro no es seguro para censurar PDFs?",
        "a": "El marcador negro en los editores de PDF solo agrega una capa visual superficial. El texto subyacente sigue siendo seleccionable y buscable, por lo que cualquiera puede copiarlo o quitar la capa."
      }
    ],
    "toc": {
      "title": "En esta página",
      "tool": "Herramienta de censura",
      "guide": "Guía paso a paso",
      "comparison": "Vectorial vs Resaltador",
      "checklist": "Datos confidenciales",
      "faq": "Preguntas frecuentes",
      "ctaTitle": "¿Necesita censurar ahora?",
      "ctaBtn": "Censurar PDF — Gratis"
    }
  },
  "fr": {
    "eyebrow": "Guide Complet",
    "title": "Comment caviarder et biffer définitivement un PDF sans Adobe Pro",
    "intro": "Lorsqu'il s'agit de documents sensibles — relevés bancaires, déclarations fiscales, contrats, dossiers médicaux ou pièces d'identité —, masquer les données privées avant de les partager est crucial. Cependant, la plupart des utilisateurs pensent qu'il faut un abonnement coûteux à Adobe Acrobat Pro ou commettent l'erreur dangereuse d'utiliser un surligneur noir dans un lecteur basique.",
    "calloutTitle": "Le piège du surligneur noir",
    "calloutText": "Utiliser un pinceau ou un outil de surlignage noir dans les lecteurs PDF standards ne supprime PAS le texte. Le texte sous-jacent reste intact dans la structure du document et peut être sélectionné, copié ou dévoilé en retirant simplement le tracé visuel.",
    "stepsTitle": "Étape par étape : Véritable caviardage de PDF dans votre navigateur",
    "steps": [
      {
        "title": "Sélectionnez ou déposez votre PDF",
        "desc": "Glissez-déposez votre fichier dans la zone ci-dessus ou parcourez votre appareil. Votre fichier est traité à 100 % localement dans la mémoire du navigateur — aucun transfert sur le réseau."
      },
      {
        "title": "Tracez des zones de caviardage",
        "desc": "Cliquez et glissez avec la souris (ou avec un doigt sur écran tactile) pour poser des rectangles noirs opaques sur les données sensibles. Vous pouvez redimensionner ou supprimer chaque cadre avant export."
      },
      {
        "title": "Parcourez plusieurs pages",
        "desc": "Utilisez le sélecteur de page pour naviguer et masquer chaque information confidentielle sur l'ensemble du document."
      },
      {
        "title": "Téléchargez le PDF définitivement caviardé",
        "desc": "Cliquez sur Télécharger le PDF. L'outil incruste des rectangles vectoriels opaques directement dans les coordonnées du PDF, détruisant définitivement le texte sous-jacent."
      }
    ],
    "tableTitle": "Caviardage vectoriel vs Surlignage visuel : La différence essentielle",
    "tableHeaders": [
      "Fonctionnalité",
      "PDF Redact Free",
      "Surligneur Noir",
      "Adobe Acrobat Pro"
    ],
    "tableRows": [
      [
        "Texte non sélectionnable ?",
        "Oui (Définitivement)",
        "Non (Copiable)",
        "Oui"
      ],
      [
        "Le fichier quitte l'appareil ?",
        "Jamais (100% Client)",
        "Variable",
        "Synchronisé cloud"
      ],
      [
        "Coût",
        "Gratuit pour toujours",
        "Gratuit",
        "239 €/an"
      ],
      [
        "Sans inscription requise",
        "Oui",
        "Oui",
        "Compte obligatoire"
      ],
      [
        "Support mobile",
        "iOS & Android",
        "Application requise",
        "Application requise"
      ]
    ],
    "checklistTitle": "Quelles informations doivent toujours être caviardées ?",
    "checklist": [
      {
        "title": "Identifiants administratifs",
        "desc": "Numéros de sécurité sociale (NIR), numéros de passeport, permis de conduire et cartes nationales d'identité."
      },
      {
        "title": "Données financières",
        "desc": "Relevés d'identité bancaire (RIB/IBAN), codes guichet, numéros de carte de crédit et codes CVV."
      },
      {
        "title": "Coordonnées et vie privée",
        "desc": "Adresses de domicile, numéros de téléphone personnels, dates de naissance et noms de famille."
      },
      {
        "title": "Dossiers de santé",
        "desc": "Informations médicales, diagnostics cliniques et ordonnances protégées par le secret médical."
      },
      {
        "title": "Données commerciales stratégiques",
        "desc": "Secrets d'affaires, barèmes tarifaires, listes clients confidentielles et montants de transactions."
      }
    ],
    "faqTitle": "Foire Aux Questions",
    "faqList": [
      {
        "q": "Comment caviarder un PDF en ligne gratuitement sans inscription ?",
        "a": "Déposez votre PDF sur PDF Redact Free, tracez des zones vectorielles noires sur les données sensibles et cliquez sur Télécharger. Tout s'exécute localement dans votre navigateur sans compte ni envoi sur serveur."
      },
      {
        "q": "Comment noircir du texte dans un PDF sans Adobe Acrobat Pro ?",
        "a": "PDF Redact Free met à disposition un outil de caviardage vectoriel gratuit dans votre navigateur. Il grave des rectangles noirs permanents sur les coordonnées du texte sans logiciel payant."
      },
      {
        "q": "Peut-on voir sous le texte noirci dans un PDF ?",
        "a": "Pas avec un véritable caviardage vectoriel. Contrairement aux surlignages noirs simples, PDF Redact Free insère des couches vectorielles opaques définitives dans la syntaxe du PDF."
      },
      {
        "q": "Ce caviardeur est-il sûr pour les fiches de paie et relevés de compte ?",
        "a": "Oui. PDF Redact Free s'exécute intégralement côté client via WebAssembly et JavaScript. Vos documents ne quittent jamais votre appareil."
      },
      {
        "q": "Pourquoi le surligneur noir n'est-il pas sécurisé pour biffer un PDF ?",
        "a": "Le surligneur noir ajoute seulement une couleur de premier plan. Le texte reste entièrement présent et indexé dans le fichier PDF, ce qui permet à quiconque de le copier ou d'enlever la couleur."
      }
    ],
    "toc": {
      "title": "Sur cette page",
      "tool": "Outil de caviardage",
      "guide": "Guide étape par étape",
      "comparison": "Vectoriel vs Surligneur",
      "checklist": "Données confidentielles",
      "faq": "Questions fréquentes",
      "ctaTitle": "Besoin de caviarder ?",
      "ctaBtn": "Caviarder un PDF — Gratuit"
    }
  },
  "de": {
    "eyebrow": "Vollständiger Leitfaden",
    "title": "PDF dauerhaft und sicher schwärzen ohne Adobe Acrobat Pro",
    "intro": "Beim Umgang mit vertraulichen Dokumenten — wie Kontoauszügen, Steuererklärungen, Verträgen, Krankenakten oder Ausweisen — ist das Schwärzen privater Daten vor der Weitergabe unerlässlich. Viele Nutzer glauben, sie bräuchten teure Adobe Acrobat Pro Lizenzen, oder machen den fatalen Fehler, Textstellen einfach mit einem schwarzen Textmarker in Standard-Readern zu übermalen.",
    "calloutTitle": "Die Textmarker-Falle",
    "calloutText": "Das simple Übermalen mit einem schwarzen Zeichenstift oder Textmarker in herkömmlichen PDF-Betrachtern schwärzt den Text NICHT ab. Der darunterliegende Text bleibt in der Datenstruktur der Datei vollständig erhalten und kann durch Kopieren, Suchen oder Entfernen der Farbfläche wieder sichtbar gemacht werden.",
    "stepsTitle": "Schritt für Schritt: Echtes PDF-Schwärzen direkt im Browser",
    "steps": [
      {
        "title": "PDF auswählen oder hineinziehen",
        "desc": "Ziehen Sie Ihre Datei per Drag-and-Drop in den oberen Bereich oder wählen Sie sie aus. Ihr Dokument wird zu 100 % lokal im Speicher Ihres Browsers verarbeitet — kein Byte wird über das Internet gesendet."
      },
      {
        "title": "Schwärzungs-Rechtecke aufziehen",
        "desc": "Klicken und ziehen Sie mit der Maus (oder mit einem Finger auf Touchscreens), um solide schwarze Rechtecke über vertrauliche Daten zu legen. Jedes Rechteck kann vor dem Export angepasst oder gelöscht werden."
      },
      {
        "title": "Mehrseitige Dokumente prüfen",
        "desc": "Navigieren Sie mit den Pfeiltasten oder der Seitenauswahl durch alle Seiten und schwärzen Sie alle vertraulichen Vorkommen im gesamten Dokument."
      },
      {
        "title": "Dauerhaft geschwärztes PDF herunterladen",
        "desc": "Klicken Sie auf PDF herunterladen. Die Anwendung brennt undurchsichtige Vektor-Rechtecke direkt in die Koordinaten der PDF-Struktur ein und vernichtet den darunterliegenden Text dauerhaft."
      }
    ],
    "tableTitle": "Echtes Vektor-Schwärzen vs. Textmarker: Der entscheidende Unterschied",
    "tableHeaders": [
      "Kriterium",
      "PDF Redact Free",
      "Schwarzer Textmarker",
      "Adobe Acrobat Pro"
    ],
    "tableRows": [
      [
        "Text unkopierbar?",
        "Ja (Dauerhaft)",
        "Nein (Kopierbar)",
        "Ja"
      ],
      [
        "Verlässt die Datei das Gerät?",
        "Niemals (100% Client)",
        "Variiert",
        "Cloud-Synchronisation"
      ],
      [
        "Kosten",
        "Dauerhaft kostenlos",
        "Kostenlos",
        "239 €/Jahr"
      ],
      [
        "Keine Registrierung erforderlich",
        "Ja",
        "Ja",
        "Konto erforderlich"
      ],
      [
        "Mobilgeräte-Unterstützung",
        "iOS & Android",
        "App erforderlich",
        "App erforderlich"
      ]
    ],
    "checklistTitle": "Welche Daten sollten immer geschwärzt werden?",
    "checklist": [
      {
        "title": "Behördliche Identifikationsnummern",
        "desc": "Sozialversicherungsnummern, Steuer-IDs, Passnummern, Personalausweisdaten und Führerscheinnummern."
      },
      {
        "title": "Finanz- & Bankdaten",
        "desc": "IBANs, Kontonummern, Bankleitzahlen, Kreditkartennummern und CVV-Sicherheitscodes."
      },
      {
        "title": "Kontakt- & Personendaten",
        "desc": "Wohnanschriften, private Telefonnummern, Geburtsdaten und Familiennamen."
      },
      {
        "title": "Medizinische Unterlagen",
        "desc": "Gesundheitsdaten, Diagnosen, Arztberichte und Medikamentenpläne unter ärztlicher Schweigepflicht."
      },
      {
        "title": "Geschäftsgeheimnisse",
        "desc": "Kalkulationen, Preiskonditionen, vertrauliche Kundenlisten und vertragliche Vereinbarungen."
      }
    ],
    "faqTitle": "Häufig gestellte Fragen (FAQ)",
    "faqList": [
      {
        "q": "Wie schwärzt man ein PDF online kostenlos ohne Registrierung?",
        "a": "Laden Sie Ihr PDF bei PDF Redact Free hoch, ziehen Sie schwarze Vektor-Boxen über sensible Daten und klicken Sie auf Download. Der gesamte Vorgang läuft lokal in Ihrem Browser ohne Cloud-Uploads ab."
      },
      {
        "q": "Wie schwärzt man Text in einem PDF ohne Adobe Acrobat Pro?",
        "a": "PDF Redact Free stellt ein kostenloses Vektor-Schwärzungstool im Browser bereit, das permanente opake Rechtecke über Textkoordinaten einbrennt, sodass keine teure Software nötig ist."
      },
      {
        "q": "Kann jemand unter geschwärztem Text in einem PDF nachsehen?",
        "a": "Nicht bei echtem Vektor-Schwärzen. Im Gegensatz zu oberflächlichen Markierungen platziert PDF Redact Free permanente opake Vektor-Rechtecke direkt in der PDF-Struktur."
      },
      {
        "q": "Ist dieses PDF-Tool sicher für Bankauszüge und Steuerunterlagen?",
        "a": "Ja. PDF Redact Free läuft vollständig clientseitig via WebAssembly und JavaScript. Ihre Dokumente werden niemals an einen externen Server übertragen."
      },
      {
        "q": "Warum ist ein schwarzer Textmarker nicht sicher zum Schwärzen?",
        "a": "Ein Textmarker legt lediglich eine Farbebene über den Text. Der Originaltext bleibt in der PDF-Datei durchsuchbar und kopierbar und kann von jedem leicht freigelegt werden."
      }
    ],
    "toc": {
      "title": "Auf dieser Seite",
      "tool": "Schwärzungs-Tool",
      "guide": "Schritt-für-Schritt-Anleitung",
      "comparison": "Vektor vs. Textmarker",
      "checklist": "Sensible Daten Checkliste",
      "faq": "Häufige Fragen",
      "ctaTitle": "Jetzt schwärzen?",
      "ctaBtn": "PDF schwärzen — Kostenlos"
    }
  },
  "pt": {
    "eyebrow": "Guia Completo",
    "title": "Como tarjar e ocultar texto em PDF permanentemente sem Adobe Pro",
    "intro": "Ao lidar com documentos confidenciais — extratos bancários, declarações de imposto de renda, contratos, registros de saúde ou identidades —, proteger informações privadas antes do compartilhamento é essencial. No entanto, a maioria pensa que precisa pagar caro pelo Adobe Acrobat Pro ou usa perigosamente marcadores pretos visuais que não apagam os dados.",
    "calloutTitle": "A armadilha do marcador preto",
    "calloutText": "Usar pincel ou ferramenta de marcação preta em visualizadores comuns de PDF NÃO apaga o texto. O texto subjacente permanece intacto na camada do arquivo e pode ser selecionado, copiado ou revelado simplesmente removendo a camada visual sobreposta.",
    "stepsTitle": "Passo a passo: Verdadeira redação de PDF no seu navegador",
    "steps": [
      {
        "title": "Selecione ou arraste seu PDF",
        "desc": "Arraste e solte o arquivo na área acima ou clique para navegar no seu dispositivo. O processamento acontece 100% na memória local do navegador — nada é enviado para servidores."
      },
      {
        "title": "Desenhe caixas de tarja preta",
        "desc": "Clique e arraste com o mouse (ou com 1 dedo na tela sensível ao toque) para cobrir dados confidenciais com retângulos pretos opacos. Você pode redimensionar ou apagar caixas antes de concluir."
      },
      {
        "title": "Navegue pelas páginas",
        "desc": "Use as setas ou o seletor de páginas para revisar o documento completo e tarjar todas as informações confidenciais."
      },
      {
        "title": "Baixe o PDF permanentemente tarjado",
        "desc": "Clique em Baixar PDF. A ferramenta grava retângulos vetoriais opacos nas coordenadas exatas do PDF, destruindo permanentemente a camada de texto original."
      }
    ],
    "tableTitle": "Redação vetorial vs. Marcador visual: A diferença decisiva",
    "tableHeaders": [
      "Recurso",
      "PDF Redact Free",
      "Marcador Preto",
      "Adobe Acrobat Pro"
    ],
    "tableRows": [
      [
        "Texto fica incopiável?",
        "Sim (Permanente)",
        "Não (Copiável)",
        "Sim"
      ],
      [
        "O arquivo sai do seu aparelho?",
        "Nunca (100% Local)",
        "Varia",
        "Sincronizado na nuvem"
      ],
      [
        "Custo",
        "Gratuito para sempre",
        "Gratuito",
        "R$ 1.200+/ano"
      ],
      [
        "Sem cadastro obrigatório",
        "Sim",
        "Sim",
        "Exige conta"
      ],
      [
        "Suporte em celulares",
        "iOS e Android",
        "Exige aplicativo",
        "Exige aplicativo"
      ]
    ],
    "checklistTitle": "Quais informações devem ser sempre tarjadas?",
    "checklist": [
      {
        "title": "Identificações civis e fiscais",
        "desc": "Números de CPF, RG, CNH, passaportes e registros governamentais."
      },
      {
        "title": "Dados bancários e cartões",
        "desc": "Números de conta, agência, chaves Pix, cartões de crédito, CVV e códigos IBAN."
      },
      {
        "title": "Contato e dados pessoais",
        "desc": "Endereços residenciais, telefones pessoais, datas de nascimento e filiação."
      },
      {
        "title": "Prontuários e exames médicos",
        "desc": "Informações de saúde, diagnósticos, laudos e receitas médicas protegidos por sigilo."
      },
      {
        "title": "Dados corporativos confidenciais",
        "desc": "Segredos comerciais, acordos de preços, listas restritas de clientes e valores de acordos."
      }
    ],
    "faqTitle": "Perguntas Frequentes",
    "faqList": [
      {
        "q": "Como tarjar um PDF online grátis sem cadastro?",
        "a": "Envie seu PDF para o PDF Redact Free, desenhe caixas pretas sobre os dados sensíveis e clique em Baixar. O processo é 100% local no seu navegador, sem cadastro e sem nuvem."
      },
      {
        "q": "Como ocultar texto em PDF sem Adobe Acrobat Pro?",
        "a": "O PDF Redact Free disponibiliza redação vetorial gratuita no navegador. Ele queima retângulos pretos opacos sobre o texto, sem necessidade de programas pagos."
      },
      {
        "q": "É possível ver o que está sob o texto tarjado no PDF?",
        "a": "Não quando se usa redação vetorial de verdade. Ao contrário de marcações simples, o PDF Redact Free grava retângulos opacos permanentes no código interno do PDF."
      },
      {
        "q": "Este redator de PDF é seguro para extratos e declarações de imposto?",
        "a": "Sim. O PDF Redact Free funciona inteiramente com WebAssembly e JavaScript no seu navegador. Os arquivos nunca saem do seu computador ou celular."
      },
      {
        "q": "Por que o marcador preto comum não é seguro para tarjar PDFs?",
        "a": "O marcador preto padrão apenas coloca uma cor sobre a letra. O texto original permanece copiável e pesquisável, e qualquer pessoa pode remover a camada visual."
      }
    ],
    "toc": {
      "title": "Nesta página",
      "tool": "Ferramenta de tarja",
      "guide": "Guía passo a passo",
      "comparison": "Vetorial vs Marcador",
      "checklist": "Dados confidenciais",
      "faq": "Perguntas frequentes",
      "ctaTitle": "Precisa tarjar agora?",
      "ctaBtn": "Tarjar PDF — Grátis"
    }
  },
  "hi": {
    "eyebrow": "संपूर्ण गाइड",
    "title": "बिना एडोब प्रो के पीडीएफ में टेक्स्ट को हमेशा के लिए कैसे छुपाएं (ब्लैकआउट करें)",
    "intro": "बैंक स्टेटमेंट, टैक्स रिटर्न, अनुबंध, मेडिकल रिकॉर्ड या पहचान पत्र जैसे गोपनीय दस्तावेज़ साझा करते समय निजी जानकारी को हटाना बेहद ज़रूरी है। ज़्यादातर लोग महंगे एडोब एक्रोबैट प्रो सॉफ़्टवेयर का सहारा लेते हैं या साधारण पीडीएफ व्यूअर में काले मार्कर से लाइन खींचने की ख़तरनाक ग़लती करते हैं।",
    "calloutTitle": "ब्लैक हाइलाइटर का बड़ा धोखा",
    "calloutText": "साधारण पीडीएफ व्यूअर में काले रंग का ब्रश या हाइलाइटर लगाने से टेक्स्ट कभी नहीं मिटता। मूल टेक्स्ट दस्तावेज़ की परत में सुरक्षित रहता है और कोई भी व्यक्ति उसे आसानी से कॉपी कर सकता है, खोज सकता है या उस परत को हटाकर पढ़ सकता है।",
    "stepsTitle": "चरण-दर-चरण: अपने ब्राउज़र में सुरक्षित पीडीएफ रिडक्शन",
    "steps": [
      {
        "title": "पीडीएफ चुनें या ड्रॉप करें",
        "desc": "अपनी फ़ाइल को ऊपर दिए गए बॉक्स में खींचकर छोड़ें या अपने डिवाइस से चुनें। आपकी फ़ाइल 100% आपके ब्राउज़र की मेमोरी में प्रोसेस होती है — नेटवर्क पर कुछ भी नहीं जाता।"
      },
      {
        "title": "काले रंग के बॉक्स बनाएं",
        "desc": "माउस से क्लिक और ड्रैग करके (या टच स्क्रीन पर 1 उंगली से) संवेदनशील टेक्स्ट या नंबरों पर पक्के काले बॉक्स बनाएं। आप किसी भी बॉक्स का आकार बदल या हटा सकते हैं।"
      },
      {
        "title": "सभी पेज देखें",
        "desc": "पेज नेविगेटर का उपयोग करके सभी पेजों पर जाएं और पूरे दस्तावेज़ में गोपनीय जानकारी को छुपाएं।"
      },
      {
        "title": "सुरक्षित पीडीएफ डाउनलोड करें",
        "desc": "डाउनलोड पीडीएफ पर क्लिक करें। टूल पीडीएफ के अंदर पक्के अपारदर्शी वेक्टर बॉक्स जोड़ देता है जिससे मूल टेक्स्ट हमेशा के लिए नष्ट हो जाता है।"
      }
    ],
    "tableTitle": "वेक्टर रिडक्शन बनाम साधारण हाइलाइटर: मुख्य अंतर",
    "tableHeaders": [
      "सुविधा",
      "PDF Redact Free",
      "ब्लैक हाइलाइटर",
      "Adobe Acrobat Pro"
    ],
    "tableRows": [
      [
        "क्या टेक्स्ट कॉपी नहीं हो सकता?",
        "हाँ (हमेशा के लिए)",
        "नहीं (कॉपी हो सकता है)",
        "हाँ"
      ],
      [
        "क्या फ़ाइल डिवाइस से बाहर जाती है?",
        "कभी नहीं (100% लोकल)",
        "अनिश्चित",
        "क्लाउड सिंक"
      ],
      [
        "लागत",
        "हमेशा के लिए मुफ़्त",
        "मुफ़्त",
        "₹20,000+/वर्ष"
      ],
      [
        "साइन-अप की आवश्यकता नहीं",
        "हाँ",
        "हाँ",
        "खाता ज़रूरी"
      ],
      [
        "मोबाइल सपोर्ट",
        "iOS और Android",
        "ऐप ज़रूरी",
        "ऐप ज़रूरी"
      ]
    ],
    "checklistTitle": "कौन सी जानकारी हमेशा रिडैक्ट की जानी चाहिए?",
    "checklist": [
      {
        "title": "सरकारी पहचान प्रमाण",
        "desc": "आधार कार्ड, पैन कार्ड, पासपोर्ट नंबर, वोटर आईडी और ड्राइविंग लाइसेंस नंबर।"
      },
      {
        "title": "वित्तीय जानकारी",
        "desc": "बैंक खाता संख्या, आईएफएससी कोड, क्रेडिट कार्ड नंबर, सीवीवी और यूपीआई आईडी।"
      },
      {
        "title": "व्यक्तिगत संपर्क विवरण",
        "desc": "घर का पता, निजी मोबाइल नंबर, जन्म तिथि और परिवार के सदस्यों के नाम।"
      },
      {
        "title": "चिकित्सा रिकॉर्ड",
        "desc": "मरीज़ की स्वास्थ्य जानकारी, निदान रिपोर्ट और पर्चे जो गोपनीयता कानूनों के तहत आते हैं।"
      },
      {
        "title": "व्यावसायिक गोपनीय डेटा",
        "desc": "व्यापारिक रहस्य, मूल्य निर्धारण शर्तें, निजी ग्राहक सूचियाँ और कानूनी समझौते।"
      }
    ],
    "faqTitle": "अक्सर पूछे जाने वाले प्रश्न (FAQ)",
    "faqList": [
      {
        "q": "बिना साइन अप के मुफ़्त में ऑनलाइन पीडीएफ कैसे रिडैक्ट करें?",
        "a": "पीडीएफ रेडैक्ट फ्री पर फ़ाइल अपलोड करें, संवेदनशील डेटा पर काले बॉक्स बनाएं और डाउनलोड पर क्लिक करें। सब कुछ आपके ब्राउज़र में सुरक्षित और स्थानीय रूप से प्रोसेस होता है।"
      },
      {
        "q": "बिना एडोब एक्रोबैट प्रो के पीडीएफ में टेक्स्ट कैसे छुपाएं?",
        "a": "यह टूल ब्राउज़र में ही मुफ़्त वेक्टर रिडक्शन सुविधा देता है। यह टेक्स्ट कोऑर्डिनेट्स पर पक्के काले बॉक्स जला देता है जिससे महंगे सॉफ़्टवेयर की ज़रूरत नहीं पड़ती।"
      },
      {
        "q": "क्या पीडीएफ में छुपाए गए टेक्स्ट के नीचे देखा जा सकता है?",
        "a": "वेक्टर रिडक्शन के साथ बिल्कुल नहीं। यह कोई रंगीन हाइलाइटर नहीं है; यह पीडीएफ के आंतरिक कोड में अपारदर्शी परत जोड़ता है जिससे टेक्स्ट हमेशा के लिए समाप्त हो जाता है।"
      },
      {
        "q": "क्या यह टूल बैंक स्टेटमेंट और टैक्स फ़ॉर्म के लिए सुरक्षित है?",
        "a": "हाँ, पूरी तरह सुरक्षित है। यह वेबअसेंबली और जावास्क्रिप्ट के ज़रिए आपके डिवाइस पर चलता है। आपका दस्तावेज़ किसी भी बाहरी सर्वर पर कभी नहीं जाता।"
      },
      {
        "q": "पीडीएफ रिडैक्ट करने के लिए साधारण ब्लैक मार्कर सुरक्षित क्यों नहीं है?",
        "a": "साधारण ब्लैक मार्कर केवल टेक्स्ट के ऊपर रंग की एक परत जोड़ता है। मूल टेक्स्ट फ़ाइल में बना रहता है और कोई भी उसे कॉपी करके पढ़ सकता है।"
      }
    ],
    "toc": {
      "title": "इस पृष्ठ पर",
      "tool": "पीडीएफ रिडैक्टर टूल",
      "guide": "चरण-दर-चरण गाइड",
      "comparison": "वेक्टर बनाम हाइलाइटर",
      "checklist": "संवेदनशील डेटा सूची",
      "faq": "अक्सर पूछे जाने वाले प्रश्न",
      "ctaTitle": "क्या अभी रिडैक्ट करना है?",
      "ctaBtn": "पीडीएफ रिडैक्ट करें — मुफ़्त"
    }
  },
  "ja": {
    "eyebrow": "完全ガイド",
    "title": "Adobe Acrobat ProなしでPDFの文字を完全に黒塗り・墨消しする方法",
    "intro": "銀行取引明細書、確定申告書、契約書、カルテ、公的身分証明書などの機密文書を共有する際、個人情報の確実な墨消しは必須です。しかし多くのユーザーは、高価なAdobe Proを契約するか、通常のPDF閲覧ソフトで黒マーカーを引くだけという危険な方法に頼っています。",
    "calloutTitle": "黒マーカー機能の危険な罠",
    "calloutText": "一般的なPDF閲覧ソフトの黒マーカーやペンツールで文字を塗りつぶしても、テキストは一切消去されていません。下層の文字データはそのまま残っており、選択、テキストコピー、検索、あるいは描画オブジェクトの削除によって簡単に元の個人情報が復元されてしまいます。",
    "stepsTitle": "ステップ別：ブラウザで完結する安全なPDF黒塗り手順",
    "steps": [
      {
        "title": "PDFを選択またはドロップ",
        "desc": "ファイルを上の枠にドラッグ＆ドロップするか、デバイスから選択します。処理は100%ブラウザのメモリ内で行われ、外部サーバーへファイルが送信されることはありません。"
      },
      {
        "title": "黒塗りボックスを配置",
        "desc": "マウスのドラッグ（またはスマホ画面の1本指スワイプ）で、隠したい文字や画像の上に不透明な黒ボックスを配置します。ボックスの位置やサイズは何度でも調整・削除が可能です。"
      },
      {
        "title": "複数ページを確認",
        "desc": "ページ送りボタンを使用して文書内の全ページをめくり、見落としなく機密情報をカバーします。"
      },
      {
        "title": "完全に墨消しされたPDFをダウンロード",
        "desc": "「PDFをダウンロード」をクリックします。PDFの座標系に直接不透明なベクター長方形が焼き付けられ、基のテキストデータは永久に消去されます。"
      }
    ],
    "tableTitle": "ベクター墨消し vs 視覚的マーカー：決定的な違い",
    "tableHeaders": [
      "項目",
      "PDF Redact Free",
      "黒色マーカー",
      "Adobe Acrobat Pro"
    ],
    "tableRows": [
      [
        "文字の選択・コピー不可？",
        "はい（永久的）",
        "いいえ（コピー可能）",
        "はい"
      ],
      [
        "ファイルが端末外へ出る？",
        "絶対にない（100%端末内）",
        "サービスによる",
        "クラウド同期あり"
      ],
      [
        "利用料金",
        "完全無料",
        "無料",
        "年額 約35,000円〜"
      ],
      [
        "アカウント登録不要",
        "はい",
        "はい",
        "登録必須"
      ],
      [
        "スマートフォン対応",
        "iOS & Android対応",
        "アプリ必須",
        "アプリ必須"
      ]
    ],
    "checklistTitle": "確実に黒塗り・墨消しすべき機密情報リスト",
    "checklist": [
      {
        "title": "公的身分証明情報",
        "desc": "マイナンバー、パスポート番号、運転免許証番号、保険証の記号番号。"
      },
      {
        "title": "金融・決済情報",
        "desc": "銀行口座番号、支店コード、クレジットカード番号、有効期限、セキュリティコード。"
      },
      {
        "title": "個人連絡先情報",
        "desc": "自宅住所、個人の携帯電話番号、生年月日、家族の氏名。"
      },
      {
        "title": "医療・健康記録",
        "desc": "健康診断結果、病歴、処方薬リスト、各種診断書などの要配慮個人情報。"
      },
      {
        "title": "企業機密・取引情報",
        "desc": "取引先名、契約金額、単価設定、未公開の業務提携情報や和解条件。"
      }
    ],
    "faqTitle": "よくある質問（FAQ）",
    "faqList": [
      {
        "q": "登録なしで安全にPDFを無料黒塗りできますか？",
        "a": "はい。PDF Redact Freeにファイルをドラッグし、黒ボックスを配置してダウンロードするだけです。全処理がブラウザ内で完結し、サーバー送信は一切ありません。"
      },
      {
        "q": "Adobe Acrobat ProなしでPDFの文字を消せますか？",
        "a": "可能です。本ツールはpdf-lib技術を用いてテキスト座標上に不透明なベクター長方形を恒久的に焼き付けるため、高額なソフトは不要です。"
      },
      {
        "q": "黒塗りした下の文字は誰かに見られませんか？",
        "a": "本ツールのベクター墨消しであれば絶対に見られません。単なる色付けとは異なり、PDFの内部データから該当座標のテキストが完全に遮断されます。"
      },
      {
        "q": "銀行の明細書や確定申告書を読み込ませても安全ですか？",
        "a": "100%安全です。WebAssemblyとJavaScriptにより端末のローカル環境のみで動作し、クラウドや外部サーバーへデータが漏洩するリスクはゼロです。"
      },
      {
        "q": "なぜ一般的なビューアの黒ペン機能では危険なのですか？",
        "a": "一般的なペン機能は文字の上に黒い図形を置いているだけです。ファイル内の文字データは残っているため、簡単にコピーや検索で情報が抜き取られてしまいます。"
      }
    ],
    "toc": {
      "title": "目次",
      "tool": "黒塗りツール",
      "guide": "手順ガイド",
      "comparison": "ベクター墨消し vs マーカー",
      "checklist": "機密情報リスト",
      "faq": "よくある質問",
      "ctaTitle": "今すぐ黒塗りしますか？",
      "ctaBtn": "PDFを黒塗り — 無料"
    }
  },
  "zh": {
    "eyebrow": "完整指南",
    "title": "无需Adobe Pro：如何在浏览器中永久涂黑遮盖PDF敏感文本",
    "intro": "在处理银行流水、报税单、商务合同、医疗病历或身份证明等敏感文件时，在分享前遮盖个人隐私是不可忽视的安全底线。大多数人误以为必须订阅价格高昂的Adobe Acrobat Pro，或者使用阅读器自带的黑色荧光笔，这会带来极大的泄密隐患。",
    "calloutTitle": "黑色荧光笔的隐私陷阱",
    "calloutText": "在常见PDF阅读器中使用黑色标记笔或荧光笔涂抹，并不能真正消除文字。底层的文本数据依然完整保留在文档层中，任何人通过复制、全选文本或移除图形图层，都能瞬间还原被涂抹的信息。",
    "stepsTitle": "分步操作：在本地浏览器中实现真正的PDF矢量涂黑",
    "steps": [
      {
        "title": "选择或拖放PDF文件",
        "desc": "将文件拖入上方的操作区域，或点击从电脑或手机中选择。文件在浏览器内存中100%本地处理，绝不上传到任何网络服务器。"
      },
      {
        "title": "绘制涂黑遮盖框",
        "desc": "按住鼠标左键拖动（或在触摸屏上单指滑动），在敏感文字、数字或图像上生成不透明的纯黑遮盖框。下载前可随意调整大小或删除。"
      },
      {
        "title": "检查多页文档",
        "desc": "利用翻页按钮浏览文件的每一页，确保整篇文档中的所有隐私信息均已被彻底遮盖。"
      },
      {
        "title": "下载永久脱敏的PDF",
        "desc": "点击“下载PDF”。系统采用底层pdf-lib引擎，将不透明矢量长方形直接烙印在PDF结构中，底层原始文本永久销毁且不可恢复。"
      }
    ],
    "tableTitle": "矢量永久遮盖 vs 表面荧光笔：本质区别",
    "tableHeaders": [
      "功能特性",
      "PDF Redact Free",
      "普通黑色荧光笔",
      "Adobe Acrobat Pro"
    ],
    "tableRows": [
      [
        "文本彻底无法被复制？",
        "是（永久销毁）",
        "否（仍可被复制）",
        "是"
      ],
      [
        "文件离开您的设备？",
        "绝不（100%本地）",
        "视软件而定",
        "云端同步"
      ],
      [
        "费用",
        "永久完全免费",
        "免费",
        "约 ¥1600+/年"
      ],
      [
        "无需注册账户",
        "是",
        "是",
        "必须注册账户"
      ],
      [
        "移动设备支持",
        "iOS与Android原生支持",
        "需下载App",
        "需下载App"
      ]
    ],
    "checklistTitle": "哪些信息应当始终进行涂黑脱敏？",
    "checklist": [
      {
        "title": "政府及法定身份证件",
        "desc": "身份证号、护照号、社保账号、驾驶证号等国家统一身份标识。"
      },
      {
        "title": "金融与银行账户数据",
        "desc": "银行卡号、开户行行号、信用卡CVV码、账户流水及交易金额。"
      },
      {
        "title": "联系方式与个人隐私",
        "desc": "家庭住址、私人电话、出生日期、直系亲属姓名等敏感档案。"
      },
      {
        "title": "医疗健康记录",
        "desc": "体检报告、病情诊断书、用药清单等涉及个人隐私的病历记录。"
      },
      {
        "title": "商业核心机密",
        "desc": "商业底价、采购成本、非公开客户名单及保密协议条款。"
      }
    ],
    "faqTitle": "常见问题解答 (FAQ)",
    "faqList": [
      {
        "q": "如何免费在线涂黑PDF且无需注册？",
        "a": "将PDF拖入PDF Redact Free，在敏感数据上拖画黑色遮盖方框，然后点击下载。全程在您本地浏览器中运行，无需注册任何账户，零云端上传。"
      },
      {
        "q": "没有Adobe Acrobat Pro如何涂黑PDF中的文字？",
        "a": "PDF Redact Free在浏览器中提供免费矢量脱敏工具，将纯黑不透明矩形直接写入PDF底层坐标，无需购买任何昂贵软件。"
      },
      {
        "q": "被涂黑的文字是否还能被其他人看清或提取？",
        "a": "使用本工具的真正矢量遮盖绝不可能被看清。与表面高亮不同，底层文字流已被永久破坏，任何软件都无法复制或提取。"
      },
      {
        "q": "用来遮盖银行流水或报税单是否足够安全？",
        "a": "100%安全。本工具依托WebAssembly与JavaScript纯客户端运行，您的文件绝不会发送至任何服务器，杜绝数据泄露风险。"
      },
      {
        "q": "为什么普通阅读器的黑色标记笔不安全？",
        "a": "普通标记笔仅仅是在文字上方添加了一层视觉遮罩，底层文字依然保存在PDF中，任何人只要复制文本就能获取原始内容。"
      }
    ],
    "toc": {
      "title": "本页目录",
      "tool": "PDF涂黑工具",
      "guide": "分步操作指南",
      "comparison": "矢量遮盖对比荧光笔",
      "checklist": "敏感信息清单",
      "faq": "常见问题",
      "ctaTitle": "立即开始遮盖？",
      "ctaBtn": "涂黑PDF — 完全免费"
    }
  },
  "ar": {
    "eyebrow": "الدليل الكامل",
    "title": "كيفية تعتيم وحجب النصوص في ملف PDF نهائياً بدون Adobe Pro",
    "intro": "عند التعامل مع المستندات الحساسة — مثل الكشوفات البنكية، الإقرارات الضريبية، العقود، السجلات الطبية أو الهويات الرسمية — فإن حجب المعلومات الخاصة قبل مشاركتها أمر حتمي. غير أن معظم المستخدمين يلجأون إلى برامج مدفوعة باهظة مثل Adobe Acrobat Pro، أو يقعون في خطأ فادح برسم خطوط تمييز سوداء باستخدام برامج العرض العادية.",
    "calloutTitle": "فخ قلم التمييز الأسود",
    "calloutText": "استخدام فرشاة تلوين أو قلم تمييز أسود في برامج عرض ملفات PDF العادية لا يحجب النص على الإطلاق. يظل النص الأصلي محفوظاً في طبقة المستند ويمكن لأي شخص تحديده أو نسخه أو إزالة طبقة الرسم ببساطة.",
    "stepsTitle": "خطوة بخطوة: حجب وتعتيم حقيقي لملفات PDF في متصفحك",
    "steps": [
      {
        "title": "اختر أو أسقط ملف PDF",
        "desc": "اسحب ملفك وأفلته في المربع أعلاه، أو انقر للاختيار من جهازك. تتم معالجة ملفك محلياً بنسبة 100% داخل ذاكرة المتصفح دون إرسال أي بايت عبر الإنترنت."
      },
      {
        "title": "ارسم مربعات الحجب المعتمة",
        "desc": "انقر واسحب بالماوس (أو بإصبع واحد على شاشات اللمس) لوضع مربعات سوداء غير شفافة فوق النصوص أو الأرقام أو الصور الحساسة. يمكنك تعديل الحجم أو الحذف في أي وقت."
      },
      {
        "title": "تنقل بين صفحات المستند",
        "desc": "استخدم مؤشر الصفحات للانتقال بين كافة الصفحات وحجب جميع البيانات الحساسة على امتداد المستند بالكامل."
      },
      {
        "title": "حمّل ملف PDF المحجوب نهائياً",
        "desc": "انقر على تحميل PDF. تقوم الأداة بحرق مستطيلات متجهة غير منفذة في إحداثيات ملف PDF، مما يدمر تدفق النص الأصلي تماماً بصورة لا يمكن استرجاعها."
      }
    ],
    "tableTitle": "الحجب المتجه الحقيقي مقابل التمييز البصري: الفارق الجوهري",
    "tableHeaders": [
      "الميزة",
      "PDF Redact Free",
      "قلم التمييز الأسود",
      "Adobe Acrobat Pro"
    ],
    "tableRows": [
      [
        "هل النص غير قابل للنسخ؟",
        "نعم (بشكل دائم)",
        "لا (يمكن نسخه)",
        "نعم"
      ],
      [
        "هل يغادر الملف جهازك؟",
        "أبداً (محلي 100%)",
        "يختلف حسب الموقع",
        "متزامن مع السحابة"
      ],
      [
        "التكلفة",
        "مجاني للأبد",
        "مجاني",
        "239 دولار/سنوياً"
      ],
      [
        "بدون تسجيل حساب",
        "نعم",
        "نعم",
        "يتطلب إنشاء حساب"
      ],
      [
        "دعم الهواتف والأجهزة اللوحية",
        "iOS وأندرويد",
        "يتطلب تطبيقاً خاصاً",
        "يتطلب تطبيقاً خاصاً"
      ]
    ],
    "checklistTitle": "ما هي البيانات التي يجب حجبها وتعتيمها دائماً؟",
    "checklist": [
      {
        "title": "أرقام الهوية والمستندات الحكومية",
        "desc": "أرقام الضمان الاجتماعي، أرقام جوازات السفر، رخص القيادة والأرقام الوطنية الرسمية."
      },
      {
        "title": "البيانات المالية والبنكية",
        "desc": "أرقام الحسابات، رموز التحويل، أرقام البطاقات الائتمانية، رموز الأمان CVV وحسابات IBAN."
      },
      {
        "title": "بيانات الاتصال والعناوين الشخصية",
        "desc": "العناوين المنزلية، أرقام الهواتف الشخصية، تواريخ الميلاد وأسماء العائلة."
      },
      {
        "title": "الملفات والسجلات الطبية",
        "desc": "معلومات صحة المرضى، التقارير التشخيصية والوصفات الدوائية المحمية بقوانين الخصوصية."
      },
      {
        "title": "الأسرار والبيانات التجارية",
        "desc": "أسرار العمل التجاري، شروط الأسعار، قوائم العملاء السرية ومبالغ التسويات القانونية."
      }
    ],
    "faqTitle": "الأسئلة الشائعة (FAQ)",
    "faqList": [
      {
        "q": "كيف تحجب نصاً في ملف PDF أونلاين مجاناً بدون تسجيل؟",
        "a": "ارفع ملف PDF إلى أداة PDF Redact Free، ارسم مربعات سوداء متجهة فوق البيانات السرية، ثم انقر على تحميل. العملية تجري بالكامل في متصفحك دون رفع الملفات إلى أي خادم."
      },
      {
        "q": "كيف تشطب نصاً في PDF بدون برنامج Adobe Acrobat Pro؟",
        "a": "توفر أداة PDF Redact Free وسيلة حجب رقمية متجهة مجاناً في المتصفح. تحرق مستطيلات سوداء معتمة فوق إحداثيات النص دون الحاجة لاشتراكات مدفوعة."
      },
      {
        "q": "هل يمكن لأي شخص كشف النص المحجوب في ملف PDF؟",
        "a": "مستحيل عند استخدام الحجب المتجه الحقيقي. بخلاف التظليل السطحي، فإن الأداة تدمج طبقات معتمة في بنية الملف وتلغي وجود النص نهائياً."
      },
      {
        "q": "هل هذه الأداة آمنة للكشوفات البنكية والإقرارات الضريبية؟",
        "a": "نعم، آمنة 100%. تعمل الأداة بتقنيات WebAssembly وJavaScript من جانب العميل فقط، ولا تغادر ملفاتك جهازك إطلاقاً."
      },
      {
        "q": "لماذا يعد قلم التمييز الأسود غير آمن لحجب ملفات PDF؟",
        "a": "لأن التمييز يضع لوناً ظاهرياً فقط فوق الحروف، بينما يظل النص الأصلي قابلاً للنسخ والبحث ويمكن إزالة اللون بسهولة."
      }
    ],
    "toc": {
      "title": "محتويات الصفحة",
      "tool": "أداة تعتيم PDF",
      "guide": "دليل خطوة بخطوة",
      "comparison": "الحجب المتجه مقابل التمييز",
      "checklist": "قائمة البيانات الحساسة",
      "faq": "الأسئلة الشائعة",
      "ctaTitle": "هل تريد الحجب الآن؟",
      "ctaBtn": "تعتيم PDF — مجاناً"
    }
  },
  "it": {
    "eyebrow": "Guida Completa",
    "title": "Come oscurare e censurare testo in un PDF in modo permanente senza Adobe Pro",
    "intro": "Quando si condividono documenti sensibili — estratti conto bancari, dichiarazioni fiscali, contratti, cartelle cliniche o documenti d'identità —, oscurare i dati riservati prima dell'invio è indispensabile. Tuttavia, la maggior parte degli utenti crede erroneamente di dover acquistare Adobe Acrobat Pro o commette l'errore pericoloso di usare evidenziatori neri nei visualizzatori comuni.",
    "calloutTitle": "La trappola dell'evidenziatore nero",
    "calloutText": "Usare un evidenziatore o un pennello nero nei visualizzatori PDF convenzionali NON cancella il testo. Il testo sottostante rimane intatto nella struttura del file e può essere selezionato, copiato o scoperto rimuovendo la forma grafica sovrapposta.",
    "stepsTitle": "Passo dopo passo: Vera redazione di PDF nel tuo browser",
    "steps": [
      {
        "title": "Seleziona o trascina il tuo PDF",
        "desc": "Trascina il file nell'area indicata o cercalo sul tuo computer o telefono. Il file viene elaborato al 100% nella memoria locale del tuo browser senza invii su server."
      },
      {
        "title": "Disegna le caselle di oscuramento",
        "desc": "Fai clic e trascina con il mouse (o usa un dito su dispositivi touch) per coprire i dati sensibili con rettangoli neri opachi. Puoi ridimensionare o eliminare qualsiasi riquadro prima di salvare."
      },
      {
        "title": "Naviga tra le pagine",
        "desc": "Usa i pulsanti freccia per scorrere tutte le pagine e censurare ogni informazione riservata presente nel documento."
      },
      {
        "title": "Scarica il PDF oscurato definitivamente",
        "desc": "Fai clic su Scarica PDF. Il programma imprime rettangoli vettoriali opachi direttamente nelle coordinate del PDF, distruggendo per sempre il testo sottostante."
      }
    ],
    "tableTitle": "Redazione vettoriale vs. Evidenziatore visivo: La differenza cruciale",
    "tableHeaders": [
      "Caratteristica",
      "PDF Redact Free",
      "Evidenziatore Nero",
      "Adobe Acrobat Pro"
    ],
    "tableRows": [
      [
        "Testo non selezionabile?",
        "Sì (Definitivo)",
        "No (Copiabile)",
        "Sì"
      ],
      [
        "Il file lascia il dispositivo?",
        "Mai (100% Locale)",
        "Variabile",
        "Sincronizzato sul cloud"
      ],
      [
        "Costo",
        "Gratuito per sempre",
        "Gratuito",
        "239 €/anno"
      ],
      [
        "Nessuna registrazione",
        "Sì",
        "Sì",
        "Account obbligatorio"
      ],
      [
        "Supporto mobile",
        "iOS e Android",
        "App necessaria",
        "App necessaria"
      ]
    ],
    "checklistTitle": "Quali informazioni devono essere sempre oscurate?",
    "checklist": [
      {
        "title": "Codici fiscali e documenti d'identità",
        "desc": "Codice fiscale, numeri di passaporto, carte d'identità e patenti di guida."
      },
      {
        "title": "Dati bancari e finanziari",
        "desc": "Codici IBAN, numeri di conto corrente, carte di credito, codici CVV ed estratti conto."
      },
      {
        "title": "Contatti e dati personali",
        "desc": "Indirizzi di residenza, numeri di cellulare privati, date di nascita e dati anagrafici."
      },
      {
        "title": "Cartelle e referti sanitari",
        "desc": "Diagnosi cliniche, prescrizioni mediche e dati sulla salute tutelati dalle leggi sulla privacy."
      },
      {
        "title": "Dati commerciali riservati",
        "desc": "Segreti industriali, listini prezzi riservati, elenchi clienti e accordi legali transattivi."
      }
    ],
    "faqTitle": "Domande Frequenti (FAQ)",
    "faqList": [
      {
        "q": "Come oscurare un PDF online gratis senza registrazione?",
        "a": "Carica il file su PDF Redact Free, traccia riquadri neri vettoriali sopra i dati privati e clicca su Scarica. Il processo si svolge al 100% nel tuo browser senza salvataggi su server."
      },
      {
        "q": "Come cancellare testo da un PDF senza Adobe Acrobat Pro?",
        "a": "PDF Redact Free offre uno strumento vettoriale gratuito nel browser che sovrascrive indelebilmente le coordinate del testo senza programmi a pagamento."
      },
      {
        "q": "Qualcuno può vedere sotto il testo oscurato in un PDF?",
        "a": "Non quando si utilizza la vera redazione vettoriale. A differenza delle evidenziazioni, PDF Redact Free distrugge il flusso del testo originale."
      },
      {
        "q": "Questo strumento è sicuro per estratti conto e dichiarazioni dei redditi?",
        "a": "Sì, assolutamente. Funziona tramite WebAssembly e JavaScript nel tuo dispositivo. I documenti non vengono mai caricati su server remoti."
      },
      {
        "q": "Perché l'evidenziatore nero non è sicuro per censurare un PDF?",
        "a": "Perché l'evidenziatore aggiunge solo un colore sopra il testo. Il testo originale rimane memorizzato nel file e chiunque può estrarlo o rimuovere l'evidenziazione."
      }
    ],
    "toc": {
      "title": "In questa pagina",
      "tool": "Strumento di oscuramento",
      "guide": "Guida passo-passo",
      "comparison": "Vettoriale vs Evidenziatore",
      "checklist": "Dati sensibili",
      "faq": "Domande frequenti",
      "ctaTitle": "Devi oscurare adesso?",
      "ctaBtn": "Oscura PDF — Gratis"
    }
  },
  "ru": {
    "eyebrow": "Полное руководство",
    "title": "Как навсегда закрасить и скрыть текст в PDF без Adobe Acrobat Pro",
    "intro": "При отправке конфиденциальных документов — выписок из банка, налоговых деклараций, контрактов, медицинских карт или паспортов — сокрытие личных данных перед отправкой строго обязательно. Большинство пользователей считают, что для этого нужна дорогая подписка на Adobe Acrobat Pro, или совершают опасную ошибку, используя обычный черный маркер в стандартных просмотрщиках.",
    "calloutTitle": "Ловушка черного маркера",
    "calloutText": "Использование черного маркера или инструмента рисования в обычных программах просмотра PDF НЕ удаляет текст. Исходный текст остается полностью неповрежденным в структуре документа, и любой человек может выделить его, скопировать или просто убрать графический слой.",
    "stepsTitle": "Пошагово: Настоящее векторное сокрытие данных в браузере",
    "steps": [
      {
        "title": "Выберите или перетащите PDF",
        "desc": "Перетащите файл в область выше или выберите его на устройстве. Документ обрабатывается на 100% локально в памяти вашего браузера без передачи по сети."
      },
      {
        "title": "Нарисуйте черные блоки",
        "desc": "Зажмите кнопку мыши (или проведите пальцем на сенсорном экране), чтобы перекрыть конфиденциальные строки непрозрачными черными блоками. Размеры можно менять в любой момент."
      },
      {
        "title": "Проверьте все страницы",
        "desc": "С помощью переключателя страниц просмотрите весь файл и закрасьте все секретные данные от начала до конца."
      },
      {
        "title": "Скачайте защищенный PDF",
        "desc": "Нажмите «Скачать PDF». Программа записывает непрозрачные векторные прямоугольники прямо в структуру PDF, безвозвратно уничтожая исходный текст."
      }
    ],
    "tableTitle": "Векторное скрытие против маркера: Главное отличие",
    "tableHeaders": [
      "Функция",
      "PDF Redact Free",
      "Черный маркер",
      "Adobe Acrobat Pro"
    ],
    "tableRows": [
      [
        "Текст невозможно скопировать?",
        "Да (Навсегда)",
        "Нет (Копируется)",
        "Да"
      ],
      [
        "Файл покидает устройство?",
        "Никогда (100% Локально)",
        "Зависит от сайта",
        "Синхронизация в облаке"
      ],
      [
        "Стоимость",
        "Бесплатно навсегда",
        "Бесплатно",
        "от 20 000 ₽/год"
      ],
      [
        "Без регистрации",
        "Да",
        "Да",
        "Требуется аккаунт"
      ],
      [
        "Поддержка смартфонов",
        "iOS и Android",
        "Нужно приложение",
        "Нужно приложение"
      ]
    ],
    "checklistTitle": "Какие данные обязательно нужно закрашивать?",
    "checklist": [
      {
        "title": "Государственные удостоверения",
        "desc": "Паспортные данные, СНИЛС, ИНН, номера водительских прав и загранпаспортов."
      },
      {
        "title": "Банковские и финансовые данные",
        "desc": "Номера счетов, БИК, полные номера банковских карт, коды CVC/CVV и суммы транзакций."
      },
      {
        "title": "Контакты и персональные сведения",
        "desc": "Адреса проживания, личные номера телефонов, даты рождения и девичьи фамилии."
      },
      {
        "title": "Медицинские справки и диагнозы",
        "desc": "Истории болезни, назначения врачей и анализы, защищенные врачебной тайной."
      },
      {
        "title": "Коммерческая тайна",
        "desc": "Себестоимость, ценовые соглашения, закрытые списки клиентов и суммы мировых соглашений."
      }
    ],
    "faqTitle": "Часто задаваемые вопросы (FAQ)",
    "faqList": [
      {
        "q": "Как закрасить текст в PDF онлайн бесплатно без регистрации?",
        "a": "Перетащите PDF в PDF Redact Free, закрасьте конфиденциальные блоки и нажмите «Скачать». Все работает локально в вашем браузере без загрузки на сервер."
      },
      {
        "q": "Как скрыть текст в PDF без Adobe Acrobat Pro?",
        "a": "PDF Redact Free предоставляет бесплатный инструмент векторного скрытия в браузере, который навсегда вживляет черные прямоугольники в код PDF."
      },
      {
        "q": "Можно ли увидеть то, что скрыто под черным блоком в PDF?",
        "a": "При векторном скрытии — абсолютно невозможно. Исходные символы удаляются из текста, поэтому их нельзя выделить или скопировать."
      },
      {
        "q": "Безопасен ли этот сервис для банковских выписок и налоговых документов?",
        "a": "Да, полностью. Обработка выполняется с помощью WebAssembly и JavaScript внутри вашего устройства. Файлы никуда не передаются."
      },
      {
        "q": "Почему обычный маркер в редакторе PDF небезопасен?",
        "a": "Маркер лишь накладывает цвет поверх букв. Сам текст остается доступным для поиска и копирования, и любой желающий может снять цветной слой."
      }
    ],
    "toc": {
      "title": "На этой странице",
      "tool": "Инструмент закрашивания",
      "guide": "Пошаговая инструкция",
      "comparison": "Вектор против маркера",
      "checklist": "Конфиденциальные данные",
      "faq": "Частые вопросы",
      "ctaTitle": "Нужно скрыть текст сейчас?",
      "ctaBtn": "Закрасить PDF — Бесплатно"
    }
  },
  "ko": {
    "eyebrow": "완전 가이드",
    "title": "Adobe Acrobat Pro 없이 PDF 텍스트를 영구적으로 블랙아웃(가리기)하는 방법",
    "intro": "은행 거래내역서, 세금계산서, 계약서, 진료기록, 주민등록증 등 민감한 문서를 전송할 때 개인정보를 안전하게 가리는 것은 선택이 아닌 필수입니다. 하지만 많은 사용자가 고가의 Adobe Pro를 구독하거나, 일반 뷰어의 검은색 형광펜 도구로 가리는 치명적인 실수를 저지릅니다.",
    "calloutTitle": "검은색 형광펜의 치명적인 함정",
    "calloutText": "일반 PDF 뷰어에서 검은색 형광펜이나 브러시로 덧칠해도 텍스트는 지워지지 않습니다. 문서 내부 텍스트 레이어는 그대로 남아 있어 복사, 검색, 도형 삭제를 통해 감춘 내용이 쉽게 드러납니다.",
    "stepsTitle": "단계별 가이드: 웹 브라우저에서 안전하게 PDF 블랙아웃하기",
    "steps": [
      {
        "title": "PDF 파일 선택 또는 드래그",
        "desc": "파일을 위 작업 영역으로 끌어다 놓거나 기기에서 선택합니다. 파일은 브라우저 메모리 내에서 100% 로컬로 처리되며 외부 서버로 전송되지 않습니다."
      },
      {
        "title": "블랙아웃 박스 그리기",
        "desc": "마우스 드래그(터치스크린에서는 1개 손가락)로 숨기려는 텍스트나 숫자 위에 불투명한 검은색 사각형을 그립니다. 다운로드 전 언제든 크기 조절과 삭제가 가능합니다."
      },
      {
        "title": "모든 페이지 검토",
        "desc": "페이지 이동 버튼을 이용해 문서 전체를 확인하고 문서 내 모든 기밀 정보를 완벽히 가려줍니다."
      },
      {
        "title": "영구 수정된 PDF 다운로드",
        "desc": "‘PDF 다운로드’를 클릭합니다. PDF 좌표계에 직접 불투명한 벡터 사각형을 각인하여 원본 텍스트 레이어를 영구적으로 파괴합니다."
      }
    ],
    "tableTitle": "벡터 영구 삭제 vs 시각적 형광펜: 결정적인 차이",
    "tableHeaders": [
      "기능 비교",
      "PDF Redact Free",
      "검은색 형광펜",
      "Adobe Acrobat Pro"
    ],
    "tableRows": [
      [
        "텍스트 복사 불가?",
        "예 (영구적)",
        "아니오 (복사 가능)",
        "예"
      ],
      [
        "파일이 기기 밖으로 전송?",
        "절대 없음 (100% 로컬)",
        "사이트마다 다름",
        "클라우드 동기화"
      ],
      [
        "비용",
        "평생 완전 무료",
        "무료",
        "연 30만원 이상"
      ],
      [
        "회원가입 불필요",
        "예",
        "예",
        "계정 필수"
      ],
      [
        "모바일 브라우저 지원",
        "iOS & Android 완벽 지원",
        "전용 앱 필요",
        "전용 앱 필요"
      ]
    ],
    "checklistTitle": "공유 전 반드시 블랙아웃해야 할 민감 정보 목록",
    "checklist": [
      {
        "title": "정부 및 공공 신분 정보",
        "desc": "주민등록번호, 여권번호, 운전면허번호, 외국인등록번호 등 고유식별정보."
      },
      {
        "title": "금융 및 결제 정보",
        "desc": "은행 계좌번호, 카드번호, CVC/CVV 번호, 계좌 잔액 및 거래 내역."
      },
      {
        "title": "개인 연락처 및 신상 정보",
        "desc": "자택 주소, 개인 휴대전화 번호, 생년월일, 가족 관계 정보."
      },
      {
        "title": "의료 및 건강 기록",
        "desc": "진단서, 처방전, 검사 결과지 등 민감 건강정보."
      },
      {
        "title": "기업 영업 비밀",
        "desc": "공급 원가, 고객 명단, 비공개 계약 조건 및 합의 금액."
      }
    ],
    "faqTitle": "자주 묻는 질문 (FAQ)",
    "faqList": [
      {
        "q": "회원가입 없이 온라인에서 무료로 PDF를 가릴 수 있나요?",
        "a": "네, PDF Redact Free에 문서를 올리고 가릴 부분에 검은 상자를 친 후 다운로드하시면 됩니다. 서버 업로드 없이 브라우저에서 100% 안전하게 처리됩니다."
      },
      {
        "q": "Adobe Acrobat Pro 없이 어떻게 PDF 글자를 지우나요?",
        "a": "브라우저 내에서 직접 벡터 사각형을 텍스트 좌표에 덮어씌워 영구적으로 제거하므로 유료 소프트웨어가 전혀 필요하지 않습니다."
      },
      {
        "q": "검은색으로 가린 글자를 다른 사람이 다시 볼 수 있나요?",
        "a": "진정한 벡터 삭제 방식을 적용하므로 절대 불가능합니다. 단순한 색칠과 달리 원본 텍스트 데이터 스트림 자체가 완전히 파괴됩니다."
      },
      {
        "q": "통장 사본이나 세금 증명서를 올려도 안전한가요?",
        "a": "100% 안전합니다. WebAssembly와 JavaScript 기술로 사용자의 스마트폰이나 PC 내부에서만 실행되므로 외부 유출 위험이 원천 차단됩니다."
      },
      {
        "q": "일반 PDF 뷰어의 검은색 형광펜 기능은 왜 위험한가요?",
        "a": "형광펜은 글자 위에 색깔 옷만 입히는 방식입니다. 원본 글자 데이터가 그대로 남아 있어 긁어서 복사하면 내용이 고스란히 노출됩니다."
      }
    ],
    "toc": {
      "title": "목차",
      "tool": "PDF 블랙아웃 도구",
      "guide": "단계별 가이드",
      "comparison": "벡터 삭제 vs 형광펜",
      "checklist": "민감 정보 목록",
      "faq": "자주 묻는 질문",
      "ctaTitle": "지금 바로 가리시겠습니까?",
      "ctaBtn": "PDF 블랙아웃 — 무료"
    }
  }
};
