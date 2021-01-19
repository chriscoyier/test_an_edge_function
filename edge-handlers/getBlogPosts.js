export function onRequest(event) {
  event.replaceResponse(async () => {
    const originalRequest = await fetch(event.request);
    const originalBody = await originalRequest.text();

    const cloudRequest = await fetch(
      `https://css-tricks.com/wp-json/wp/v2/posts`
    );
    const data = await cloudRequest.json();

    const manipulatedResponse = originalBody.replace(
      `<div id="blog-posts"></div>`,
      `
        <h2>
          <a href="${data[0].link}">${data[0].title.rendered}</a>
        </h2>
        ${data[0].excerpt.rendered}

        <h2>
          <a href="${data[1].link}">${data[1].title.rendered}</a>
        </h2>
        ${data[1].excerpt.rendered}

        <h2>
          <a href="${data[2].link}">${data[2].title.rendered}</a>
        </h2>
        ${data[2].excerpt.rendered}
      `
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
