export function onRequest(event) {
  event.replaceResponse(async () => {
    const originalRequest = await fetch(event.request);
    const originalBody = await originalRequest.text();

    const cloudRequest = await fetch(
      `https://css-tricks.com/wp-json/wp/v2/posts`
    );
    const data = await cloudRequest.json();
    const post = data[0];

    const manipulatedResponse = originalBody.replace(
      `<div id="blog-posts"></div>`,
      `<h1>
          <a href="${post.link}">${post.title.rendered}</a>
        </h1>
        ${post.excerpt.rendered}`
    );

    let response = new Response(manipulatedResponse, {
      headers: {
        "content-type": "text/html",
      },
      status: 200,
    });

    return response;
  });
}
