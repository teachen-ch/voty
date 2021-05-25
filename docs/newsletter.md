# How to send out newsletters

## Add newly registered teachers to newsletter

```psql
 \copy (select name || ' ' || lastname, email, '', 'Lehrer/-in','','voty.ch' from users where role='Teacher') TO '/tmp/teachers.csv' CSV
```

```sh
docker exec -it postgres cat /tmp/teachers.csv
```

Import csv to: https://newsletter.teachen.ch/subscribers?i=3&l=5

## Create new template

```sh
cp mails/newsletter-2021-2.mjml mails/newsletter-2021-x.mjml
```

Use the MJML online editor to compile and preview the file:
https://mjml.io/try-it-live

With «View HTML» you can copy & paste the code to the newsletter tool

Don't forget to create a text-only copy with the follwing footer:

```
© Verein «Teachen!», Alpenweg 11, 3110 Münsingen.
Vom Newsletter abmelden: [unsubscribe] 😢
```

## Create the campaign

https://newsletter.teachen.ch/create?i=3

Tracking-Code: `mtm_campaign=newsletter-21-x`
