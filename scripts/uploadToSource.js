import 'dotenv/config'
import { Source, DocumentBuilder } from '@coveo/push-api-client'
import movies from './movies.js'

const toDelete = []
async function main() {
  const source = new Source(process.env.APIKEY, process.env.ORGID)

  console.log('creating documents to stream')
  const enrichedmMoviesDocuments = movies.map((movie) => {
    toDelete.push({ documentId: movie.coveoURI, deleteChildren: true })
    return new DocumentBuilder(
      `https://coveo-movie-listing.herokuapp.com/movies/${movie.link.split('/').pop()}`,
      movie.title
    ).withMetadata(movie)
  })
  console.log('documents created!')

  console.log('starting stream')
  source.setSourceStatus(process.env.SOURCEID, 'REFRESH')

  console.log('starting stream')
  await source.batchUpdateDocuments(process.env.SOURCEID, {
    addOrUpdate: enrichedmMoviesDocuments,
    delete: toDelete,
  })

  console.log('stream complete')
  source.setSourceStatus(process.env.SOURCEID, 'IDLE')
}

main()
