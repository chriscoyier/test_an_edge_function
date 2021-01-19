export function onRequest(event) {
  event.replaceResponse(async () => {
    async function fetchContentJSON() {
      const response = await fetch(
        `https://css-tricks.com/wp-json/wp/v2/posts`
      );
      const data = await response.json();
      return data;
    }

    let response;
    let post;

    await fetchContentJSON().then((data) => {
      post = data[0];
    });

    console.log(post);

    response = new Response(
      `<!doctype html>
        <head>
          <meta charset="UTF-8">
        </head>
        <h1>
          <a href="${post.link}">${post.title.rendered}</a>
        </h1>
        ${post.excerpt.rendered}
        `,
      {
        headers: {
          "content-type": "text/html",
        },
        status: 200,
      }
    );

    return response;
  });
}
