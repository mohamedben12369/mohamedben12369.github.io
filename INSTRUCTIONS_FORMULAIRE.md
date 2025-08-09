# Comment utiliser et mettre à jour le formulaire Google

Si vous voyez un message d'erreur comme "Désolé, le fichier que vous avez demandé n'existe pas", suivez ces étapes pour le corriger:

1. **Vérifiez que votre formulaire Google existe toujours**
   - Connectez-vous à votre compte Google
   - Allez sur [Google Forms](https://forms.google.com)
   - Vérifiez que le formulaire avec l'ID `1V3E6EC2gDilAlC6eP2veFUfmsgJkeiia8qz4EpON2CQ` existe

2. **Si le formulaire existe, assurez-vous qu'il est public**
   - Ouvrez votre formulaire
   - Cliquez sur le bouton ⚙️ (Paramètres)
   - Allez à l'onglet "Général"
   - Assurez-vous que l'option "Limiter aux utilisateurs de [votre organisation]" n'est PAS cochée

3. **Si le formulaire n'existe plus ou vous ne le trouvez pas**
   - Créez un nouveau formulaire sur [Google Forms](https://forms.google.com)
   - Ajoutez les champs nécessaires (Nom, Téléphone, Ville, Quantité)
   - Dans Paramètres > Réponses, connectez-le à une feuille Google Sheets
   - Cliquez sur le bouton "Envoyer"
   - Sélectionnez l'onglet "<>" (Intégrer)
   - Copiez le code HTML
   - Recherchez l'ID du formulaire dans le code (il ressemble à `1FAIpQLSfq...`)
   - Mettez à jour le fichier index.html pour utiliser ce nouvel ID

4. **Modification du fichier index.html**
   - Localisez cette ligne:
   ```html
   <iframe src="https://docs.google.com/forms/d/1V3E6EC2gDilAlC6eP2veFUfmsgJkeiia8qz4EpON2CQ/viewform?embedded=true" ...
   ```
   - Remplacez l'ID du formulaire par votre nouvel ID

Les modifications ont déjà été appliquées à votre site, mais gardez ces instructions au cas où vous auriez besoin de mettre à jour le formulaire à l'avenir.
