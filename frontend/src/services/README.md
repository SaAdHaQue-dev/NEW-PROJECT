# Hero Services Guide (Hero Page Services Kaise Add Karein)

Is folder me aap apni marzi ke services add, edit ya remove kar sakte hain jo Hero section par live dikhayi dengi.

---

## 📁 Files

1. **`heroServicesData.js`**: Yahan aapka saara services ka data hai.
2. **`HeroServices.jsx`**: Yeh React component hai jo un services ko Hero section par design ke sath render karta hai.

---

## ➕ Naya Service Kaise Add Karein:

Bas **`frontend/src/services/heroServicesData.js`** file open karein, aur list me comma `,` lagakar naya object add kar dein:

```javascript
{
  id: "my-new-service",
  title: "Aapki Service Ka Naam",
  shortDesc: "Chhoti si description jo card par dikhegi",
  tag: "Category",
  badge: "New",
  iconName: "Building2", // Options: Compass, Building2, Leaf, Layers, ShieldCheck, TrendingUp, Sparkles
  link: "#expertise"
}
```

File ko **Save (`Ctrl + S`)** karein — wo automatically Hero section par live aa jayega!

