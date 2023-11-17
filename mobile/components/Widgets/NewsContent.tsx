import React from "react";
import WebView from "react-native-webview";

function NewsContent(): JSX.Element {
    return (
        <WebView
            showsVerticalScrollIndicator={false}
            javaScriptEnabled={false}
            geolocationEnabled={true}
            source={{ uri: "https://www.courrierinternational.com/" }}
        />
    );
}

export default NewsContent;
