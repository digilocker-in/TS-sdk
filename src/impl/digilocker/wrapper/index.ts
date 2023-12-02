import createClient from 'openapi-fetch';
import { paths } from '../schema/authpartner.schema';

const { get, post, put, patch, del } = createClient<paths>({
  baseUrl: 'https://myserver.com/api/v1/',
  headers: {
    Authorization: `Bearer test`,
  },
});
