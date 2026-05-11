# Labb4

Länk till webbplatsen: https://kiim94.github.io/labb4-typescript/courses

## Om uppgiften
Denna uppgift har gått ut på att skapa en Angular-applikation som hämtar data från en webbtjänst/JSON-fil och visar den på skärmen i en tabell. Det ska gå att, genom att klicka på kolumn rubrikerna, sortera A-Ö samt Ö-A. Det ska gå att skriva i en sökruta för att filtera igenom kurserna.

En service ska användas för att hantera kommunikationen för att hämta data från JSON-filen med hjälp av HttpClient.

---

### Signals

Det var spännande att använda denna, svår i början. Efter ett tag var det inte alltför problematiskt: utseendemässigt inte helt annorlunda från grundläggande TypeScript (t.ex. code: string = "" blir code = signal<string>("")). Största skillnaden med signals är att UI och värden som använder signalen uppdateras automatiskt när värdet ändras.

### Service
Denna ställde till det för min del. Lyckades till slut hitta några bra guider som visade hur det gick till och vad som skulle vara med. I efterhand verkar det praktiskt att skilja denna från komponenten som använder APIt: det gör det lättare att överblicka och återanvända, men jag undrar hur det blir när webbapplikationen är större.
