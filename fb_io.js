function fb_updateScore(finalScore) {
    // Verify the browser still knows who is playing from the login session
    if (!GLOBAL_user) {
        console.warn("No user logged in. Score tracking skipped.");
        return;
    }

    const uid = GLOBAL_user.uid;

    // Use .update() so it only changes the score field under game1
    firebase.database().ref("/" + uid + "/game1/users").update({
        score: finalScore
    }).then(() => {
        console.log("Successfully logged game score to Firebase:", finalScore);
    })
}