import React from 'react'
import ReactDOM from 'react-dom'
import {
   AtomicSearchInterface,
   AtomicResultList,
   buildSearchEngine,
   AtomicResultSectionTitle,
   AtomicResultLink,
   AtomicResultSectionExcerpt,
   AtomicResultText,
   AtomicResultImage,
   AtomicSearchBox,
   AtomicSearchBoxQuerySuggestions,
   AtomicResultSectionVisual,
   AtomicFacet,
   AtomicFacetManager,
} from '@coveo/atomic-react'

import './app.css'

const MyResultTemplateFunction = () => {
  return <>
    <AtomicResultSectionVisual style={{width: 200, height: 200}}>
      <AtomicResultImage field="image" />
    </AtomicResultSectionVisual>
    <AtomicResultSectionTitle>
      <AtomicResultLink />
    </AtomicResultSectionTitle>
    <AtomicResultSectionExcerpt>
      <AtomicResultText field="description" />
      <br />
    </AtomicResultSectionExcerpt>
  </>
};

const App = () => {
  const engine = buildSearchEngine({
    configuration: {
      accessToken: process.env.APIKEY as string,
      organizationId: process.env.ORGID as string,
      search: {searchHub: 'default' },
      
    }
  });
  return <div>
    <div className='thing'>
      <img  src='https://user-images.githubusercontent.com/10165959/155548924-be99c42a-30c3-4300-a09b-58787e8a1b0c.png' />
    </div>
    <AtomicSearchInterface engine={engine}>
      <div className='search'>
        <AtomicSearchBox>
          <AtomicSearchBoxQuerySuggestions />
        </AtomicSearchBox>
      </div>
      <AtomicFacetManager>
        <AtomicFacet field='datepublished' /> 
      </AtomicFacetManager>
      <br />
      <AtomicResultList template={MyResultTemplateFunction} fieldsToInclude="description,id,title,link,year,datepublished,genres,duration,countries,languages,directors,budget,score,image" />
    </ AtomicSearchInterface>
    <p className="footer-heart">
      Made with <img className="emoji" alt="heart" height="20" width="20" src="https://github.githubassets.com/images/icons/emoji/unicode/2764.png" /> by <a href="https://samthomas.io/">Sam</a>
    </p>
  </div>
}

ReactDOM.render(<App />,
   document.querySelector('#root'))
