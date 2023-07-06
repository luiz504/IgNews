import * as prismic from '@prismicio/client'
import * as prismicNext from '@prismicio/next'
import config from '~/../slicemachine.config.json'

/**
 * The project's Prismic repository name.
 */
export const repositoryName = config.repositoryName

/**
 * Creates a Prismic client for the project's repository. The client is used to
 * query content from the Prismic API.
 *
 * @param config - Configuration for the Prismic client.
 */
export const createPrismicClient = (
  config: prismicNext.CreateClientConfig = {},
) => {
  const fetchOptions: prismic.RequestInitLike =
    process.env.NODE_ENV === 'production'
      ? { next: { tags: ['prismic'] }, cache: 'force-cache' }
      : { next: { revalidate: 5 } }

  const client = prismic.createClient(repositoryName, {
    fetchOptions,
    accessToken: process.env.PRISMIC_ACCESS_TOKEN,
    ...config,
  })

  prismicNext.enableAutoPreviews({
    client,
    previewData: config.previewData,
    req: config.req,
  })

  return client
}
