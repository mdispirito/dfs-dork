
// check for existing token

// if found, check if token is still valid

    // if not valid and refresh token exists, attempt to refresh

// if not found, go through full auth workflow to generate auth code and token

const yahooApiConfig: ModuleOptions = getYahooApiConfig();
const client = new AuthorizationCode(yahooApiConfig);

const authorizationUri = client.authorizeURL({
    redirect_uri: 'https://localhost:3000/auth/yahoo/callback',
    scope: "",
    state:"",
});

router.get('/auth', (req, res) => {
    console.log(authorizationUri);
    res.redirect(authorizationUri);
});

router.get('/auth/yahoo/callback', async (req, res) => {
    const { code } = req.query;
    const options = {
      code: code as string,
      redirect_uri: 'oob'
    };

    try {
      const accessToken = await client.getToken(options);
      console.log('The resulting token: ', accessToken.token);
      return res.status(200).json(accessToken.token);

    } catch (error) {
      console.error(error);
      return res.status(500).json('Authentication failed');
    }
});

export class YahooAuthController {

    protected static authenticate() {
        
    }
}
