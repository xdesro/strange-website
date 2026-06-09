import 'dotenv/config';
import { readFileSync, writeFileSync } from 'fs';

const DID = 'did:plc:pbr2nzfsr6bcqjeqlvohmh5y';
const PDS = 'https://pds.strange.website';
const PUBLICATION_URI =
  'at://did:plc:pbr2nzfsr6bcqjeqlvohmh5y/site.standard.publication/3mnt43rgep222';

async function authenticate() {
  const res = await fetch(`${PDS}/xrpc/com.atproto.server.createSession`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      identifier: process.env.ATPROTO_HANDLE,
      password: process.env.ATPROTO_APP_PASSWORD,
    }),
  });

  const json = await res.json();

  if (!json.accessJwt) {
    throw new Error(`Auth failed: ${JSON.stringify(json)}`);
  }

  return json.accessJwt;
}

const JWT = await authenticate();

const filepath = '_data/websites.json';

const websites = JSON.parse(
  readFileSync(filepath, 'utf8')
);

for (const website of websites) {
  if (website.atUri) {
    console.log(
      `atUri present for ${website.date}. Skipping...`
    );
    continue;
  }

  if (!website.date) {
    console.warn('Skipping entry with no date');
    continue;
  }

  const record = {
    $type: 'site.standard.document',
    site: PUBLICATION_URI,
    title: website.date,
    path: `/${website.date}/`,
    publishedAt: new Date(website.date).toISOString(),
  };

  const res = await fetch(
    `${PDS}/xrpc/com.atproto.repo.createRecord`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${JWT}`,
      },
      body: JSON.stringify({
        repo: DID,
        collection: 'site.standard.document',
        record,
      }),
    }
  );

  const json = await res.json();

  if (!json.uri) {
    console.error(
      `Failed for ${website.date}:`,
      json
    );
    continue;
  }

  website.atUri = json.uri;

  console.log(
    `Generated /${website.date}/ → ${json.uri}`
  );
}

writeFileSync(
  filepath,
  JSON.stringify(websites, null, 2) + '\n'
);

console.log('Updated _data/websites.json');