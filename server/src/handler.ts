const corsHeaders = {
  'Access-Control-Allow-Headers': '*',
  'Access-Control-Expose-Headers': '*',
  'Access-Control-Allow-Methods': '*',
  'Access-Control-Allow-Origin': '*',
}

declare global {
  const ACCOUNT_ID_DEMO: string
  const TOKEN_DEMO: string
}

export async function handleBasicCreatorUpload(
  request: Request,
): Promise<Response> {
  const result = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID_DEMO}/stream/direct_upload`,
    {
      headers: {
        Authorization: `Bearer ${TOKEN_DEMO}`,
      },
      body: JSON.stringify({
        "maxDurationSeconds": 3600,
        "expiry": "2022-06-07T23:20:00Z",
        "requireSignedURLs": true,
        "allowedOrigins": ["*"],
     }),
      method: 'POST'
    },
  )

  return new Response(JSON.stringify(await result.json(), null, 2), {
    headers: {
      ...corsHeaders,
      'content-type': 'application/json;charset=UTF-8',
    },
  })
}

export async function handleTusCreatorUpload(
  request: Request
): Promise<Response> {
  if (request.method === "OPTIONS" || request.method == "HEAD") {
    return new Response('OK', {
      headers: {
        ...corsHeaders
      }
    })
  }
  
  const result = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID_DEMO}/stream?direct_user=true`,
    {
      headers: {
        'Authorization': `Bearer ${TOKEN_DEMO}`,
        'Tus-Resumable': '1.0.0',
        'Upload-Length': request.headers.get('Upload-Length'),
        'Upload-Metadata': request.headers.get('Upload-Metadata')
      },
      method: 'POST'
    },
  )
  const destination = result.headers.get('Location');
  return new Response(null, {
    headers: {
      ...corsHeaders,
      'Location': destination,
    },
  })
}

export async function handleCreatorUpload(request: Request) : Promise<Response> {
  return null
}