async function helloWorld(context, req) {
  try {
    // Extract user information from Azure SWA authentication context
    const clientPrincipal = req.headers['x-ms-client-principal'];
    
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

    context.res = {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      },
      body: {
        success: true,
        data: "Hello World",
        user: {
          email: userInfo.email,
          isAuthenticated: userInfo.isAuthenticated
        }
      }
    };

  } catch (error) {
    context.log.error('Error:', error);
    context.res = {
        status: 500,
        body: {
          success: false,
          error: error.message || 'Failed to run hello world'
        }
      };
  }
}

// Export the wrapped function with authentication middleware
module.exports = {
  helloWorld
};
