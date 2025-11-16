const { app } = require('@azure/functions');

app.http('helloWorld', {
  methods: ['GET'],
  authLevel: 'anonymous',
  route: 'helloWorld',
  handler: async (request, context) => {
    try {
      // Extract user information from Azure SWA authentication context
      const clientPrincipal = request.headers.get('x-ms-client-principal');
      
      let userInfo = {
        email: null,
        userId: null,
        isAuthenticated: false
      };

      if (clientPrincipal) {
        // Decode the base64 encoded client principal
        const decoded = Buffer.from(clientPrincipal, 'base64').toString('utf-8');
        const principal = JSON.parse(decoded);
        
        userInfo.isAuthenticated = true;
        userInfo.userId = principal.userId;
        
        // Extract email from claims
        if (principal.claims) {
          principal.claims.forEach(claim => {
            if (claim.typ === 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress' || 
                claim.typ === 'emails' || 
                claim.typ === 'email') {
              userInfo.email = claim.val;
            }
          });
        }
        
        // Fallback to userDetails if claims are not available
        if (!userInfo.email && principal.userDetails) {
          userInfo.email = principal.userDetails;
        }
      }

      return {
        status: 200,
        headers: {
          'Content-Type': 'application/json'
        },
        jsonBody: {
          success: true,
          data: "Hello World",
          user: {
            email: userInfo.email,
            isAuthenticated: userInfo.isAuthenticated
          }
        }
      };

    } catch (error) {
      context.error('Error:', error);
      return {
        status: 500,
        jsonBody: {
          success: false,
          error: error.message || 'Failed to run hello world'
        }
      };
    }
  }
});
