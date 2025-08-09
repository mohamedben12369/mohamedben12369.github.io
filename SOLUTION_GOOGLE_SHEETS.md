# Instructions pour résoudre le problème d'intégration Google Sheets

Il semble que les données de votre formulaire ne s'enregistrent pas correctement dans Google Sheets. Voici les étapes détaillées pour résoudre ce problème :

## 1. Redéployez votre script Google Apps Script

1. Ouvrez votre feuille de calcul Google Sheets:
   - URL: https://docs.google.com/spreadsheets/d/1qBi_XX-WKvuXrO04-xOO9oIiMW0A99_1nVs2N330f1E/edit

2. Accédez à l'éditeur de script:
   - Cliquez sur **Extensions > Apps Script**

3. Supprimez tout code existant et remplacez-le:
   - Supprimez tout le code qui se trouve déjà dans l'éditeur
   - Copiez-collez le contenu du fichier `direct_apps_script.js`
   - Cliquez sur **Enregistrer** (icône disquette)

4. Déployez en tant qu'application web:
   - Cliquez sur **Déployer > Nouveau déploiement**
   - Type: **Application web**
   - Description: "Gestionnaire de formulaire عسل الفرنان"
   - Exécuter en tant que: **Vous**
   - Qui a accès: **Tout le monde**
   - Cliquez sur **Déployer**

5. Copiez la nouvelle URL:
   - Une URL de déploiement s'affichera (commençant par https://script.google.com/macros/s/...)
   - **COPIEZ CETTE URL** - c'est l'URL que nous allons utiliser dans votre script

## 2. Mettez à jour l'URL dans votre script JavaScript

1. Ouvrez le fichier `google_sheets_script.js`
2. Recherchez la ligne contenant l'URL actuelle de l'application web (ligne 53)
3. Remplacez l'ancienne URL par la nouvelle URL que vous venez de copier
4. Enregistrez le fichier

## 3. Vérifiez les autorisations

1. Lors du premier déploiement, Google vous demandera d'autoriser le script:
   - Cliquez sur **Vérifier les autorisations**
   - Connectez-vous avec votre compte Google
   - Cliquez sur **Autoriser**

## 4. Testez le formulaire

1. Ouvrez votre page web
2. Remplissez le formulaire avec des données de test
3. Soumettez le formulaire
4. Vérifiez la console du navigateur (F12) pour voir si les logs apparaissent
5. Vérifiez votre feuille Google Sheets pour voir si les données sont ajoutées

## 5. Vérifiez les journaux d'erreurs

Si les données n'apparaissent toujours pas:
1. Retournez à l'éditeur Google Apps Script
2. Cliquez sur **Exécution > Journaux d'exécution**
3. Recherchez toute erreur qui pourrait indiquer la cause du problème

Ces étapes devraient résoudre le problème d'intégration. Si vous rencontrez encore des difficultés, notez précisément les erreurs que vous voyez dans la console ou les journaux d'exécution.
