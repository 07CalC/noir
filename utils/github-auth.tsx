import { useEffect } from 'react';
import * as WebBrowser from 'expo-web-browser';
import { makeRedirectUri, useAuthRequest } from 'expo-auth-session';
import { Button } from 'react-native';

const CLIENT_ID = process.env.EXPO_PUBLIC_GITHUB_CLIENT_ID

WebBrowser.maybeCompleteAuthSession();


// Endpoint
const discovery = {
  authorizationEndpoint: 'https://github.com/login/oauth/authorize',
  tokenEndpoint: 'https://github.com/login/oauth/access_token',
  revocationEndpoint: `https://github.com/settings/connections/applications/${CLIENT_ID}`,
};

export default function App() {
  console.log(makeRedirectUri({
    native: 'noir://redirect',
    preferLocalhost: false,
  }))
  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: `${CLIENT_ID}`,
      scopes: ['repo'],
      redirectUri: makeRedirectUri({
        native: 'noir://redirect',
        preferLocalhost: false,
      }),
    },
    discovery
  );

  useEffect(() => {
    if (response?.type === 'success') {
      const { code } = response.params;
    }
  }, [response]);

  return (
    <Button
      disabled={!request
      }
      title="Login"
      onPress={() => {
        promptAsync();
      }}
    />
  );
}
