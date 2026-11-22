"""Local fictional data for the French film, using Traction's loopback-only end-to-end fixture."""

import json
from traction import e2e_fixture as fixture

fixture.BUSINESSES = {
    "plomberie-des-tilleuls.demo": {
        "company": "Plomberie des Tilleuls",
        "who": "la gérante",
        "text": "Plomberie des Tilleuls. Rendez-vous par téléphone de 8 h à 17 h. Contact : bonjour@plomberie-des-tilleuls.demo.",
    },
    "atelier-voltaire.demo": {
        "company": "Atelier Voltaire",
        "who": "le responsable",
        "text": "Atelier Voltaire. Dépannages et installations électriques sur rendez-vous. Contact : contact@atelier-voltaire.demo.",
    },
    "menuiserie-du-port.demo": {
        "company": "Menuiserie du Port",
        "who": "la responsable",
        "text": "Menuiserie du Port. Visites sur rendez-vous par téléphone.",
    },
}
# Use French examples in the outside briefing as a French-language outlet would send them.
base_briefing = fixture.briefing


def briefing(topic):
    data = base_briefing(topic)
    b = data["briefing"]
    b.update(
        headline="La prise de rendez-vous en ligne gagne les ateliers",
        whyItMatters="Deux articles d’exemple éclairent l’évolution des réservations et du prix des logiciels.",
        watch=["Les indépendants qui travaillent encore par téléphone."],
    )
    articles = [
        (
            "Réserver après la fermeture",
            "Des ateliers testent les rendez-vous en ligne.",
            "Les appels du soir peuvent attendre le lendemain.",
            "Le Journal des artisans",
        ),
        (
            "Les artisans comparent le premier mois",
            "Le coût de départ compte dans le choix d’un outil.",
            "Un tarif simple facilite la comparaison.",
            "Le Courrier des ateliers",
        ),
    ]
    for item, (title, summary, why, outlet) in zip(b["sources"], articles):
        item.update(outlet=outlet, title=title)
    for item, (title, summary, why, outlet) in zip(b["signals"], articles):
        for key, value in list(item.items()):
            if isinstance(value, str) and key not in (
                "stance",
                "tone",
                "id",
                "signal",
                "category",
                "type",
                "date",
                "label",
            ):
                item[key] = (
                    title
                    if key in ("title", "headline")
                    else why
                    if "why" in key.lower()
                    else summary
                )
        item.update(title=title)
    return data


fixture.briefing = briefing
fixture.main()
