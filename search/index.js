const elasticsearch = require('elasticsearch');

const start = async () => {
  const client = new elasticsearch.Client({
    host: 'localhost:9200',
    // log: 'trace',
  });

  await client.ping({requestTimeout: 30000});
  console.log('pinged server');

  const query = 'London';

  const resp = await client.search({
    index: 'osm',
    type: 'place',
    body: {
      sort: [
        {
          place_rank_num: {order: 'desc'},
        },
        {
          importance_num: {order: 'desc'},
        },
      ],
      query: {
        bool: {
          should: [
            {
              match: {
                name: query,
              },
            },
            {
              match: {
                alternative_names: query,
              },
            },
          ],
        },
      },
    },
  });
  const {hits} = resp.hits;

  console.log(hits);
};

start();
