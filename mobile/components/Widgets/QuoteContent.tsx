import React from "react";
import WebView from "react-native-webview";

function QuoteContent(): JSX.Element {
    return (
        <WebView
            showsVerticalScrollIndicator={false}
            javaScriptEnabled={false}
            geolocationEnabled={true}
            source={{ uri: "https://citation-celebre.leparisien.fr/citation-du-jour" }}
        />
    );
}

export default QuoteContent;
