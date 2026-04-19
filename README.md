## Cors Rule

- frontend backend -> same domain -> cookies automatically sent with requests
- frontned and backend -> different domain -> cookies doesnt sent automatically
- frontend: withCredentials: true -> cookies sent
- backend: credentials: true (cors config) -> cookies set
- if one of credntials -> missing -> cors error
- no credentials -> no cors error -> no cookies
