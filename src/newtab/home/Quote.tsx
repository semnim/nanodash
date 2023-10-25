import { useAutoAnimate } from '@formkit/auto-animate/react'
import { SymbolIcon } from '@radix-ui/react-icons'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Oval } from 'react-loader-spinner'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { Button } from '@/components/ui/button'

type QuoteAPIType = {
  quote: string
  author: string
  category: string
  fetchedAt: Date
}
export const Quote = () => {
  const topicsList = [
    'age',
    'alone',
    'amazing',
    'anger',
    'architecture',
    'art',
    'attitude',
    'beauty',
    'best',
    'birthday',
    'business',
    'car',
    'change',
    'communications',
    'computers',
    'cool',
    'courage',
    'dad',
    'dating',
    'death',
    'design',
    'dreams',
    'education',
    'environmental',
    'equality',
    'experience',
    'failure',
    'faith',
    'family',
    'famous',
    'fear',
    'fitness',
    'food',
    'forgiveness',
    'freedom',
    'friendship',
    'funny',
    'future',
    'god',
    'good',
    'government',
    'graduation',
    'great',
    'happiness',
    'health',
    'history',
    'home',
    'hope',
    'humor',
    'imagination',
    'inspirational',
    'intelligence',
    'jealousy',
    'knowledge',
    'leadership',
    'learning',
    'legal',
    'life',
    'love',
    'marriage',
    'medical',
    'men',
    'mom',
    'money',
    'morning',
    'movies',
    'success',
  ]

  const listIdx = Math.floor(Math.random() * (topicsList.length - 1))
  const topic = topicsList[listIdx]

  const [quote, setQuote] = useState<QuoteAPIType | undefined>()
  const [isLoading, setIsLoading] = useState(true)

  const { setItem, getItem } = useLocalStorage('quote')
  const url = `https://api.api-ninjas.com/v1/quotes?category=${topic}`

  const handleLoadQuote = async () => {
    setIsLoading(true)
    const apiResult = await axios.get(url, {
      headers: {
        'X-Api-Key': import.meta.env.VITE_API_KEY,
      },
    })
    const quote: QuoteAPIType = { ...apiResult.data[0], fetchedAt: Date.now() }
    setQuote(quote)
    setItem(quote)
    setIsLoading(false)
  }

  useEffect(() => {
    const fetchQuote = async () => {
      const quoteFromStorage = getItem()

      if (quoteFromStorage) {
        const hourDifference = Math.abs(Date.now() - quoteFromStorage.fetchedAt) / (1000 * 60 * 60)

        if (hourDifference < 1) {
          const quote: QuoteAPIType = getItem()
          setQuote(quote)
          setIsLoading(false)
          return
        }
      }
      handleLoadQuote()
    }

    fetchQuote()
  }, [])
  const [parent, enableAnimations] = useAutoAnimate(/* optional config */)

  if (isLoading) {
    return (
      <div className="w-screen grid place-items-center mb-10">
        <Oval
          height={40}
          width={40}
          color="#f1f5f9"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
          ariaLabel="oval-loading"
          secondaryColor="#a786df"
          strokeWidth={2}
          strokeWidthSecondary={2}
        />
      </div>
    )
  }
  return (
    <div className="grid grid-cols-1 h-[150px]">
      <figure
        ref={parent}
        className="mx-auto px-[5rem] text-center"
        // className="grid max-w-[80rem] mx-auto gap-4 text-center fixed bottom-0 mb-2 leading-7 text-lg"
      >
        <blockquote
          cite={url}
          className="text-white text-xl before:content-['“'] after:content-['”'] before:text-3xl after:text-3xl before:relative after:relative before:top-[-10px] after:top-[-10px]"
          // className="text-white text-xl before:content-['“'] before:relative after:relative before:top-[-10px] after:top-[-10px] before:text-5xl after:content-['”'] after:text-5xl before:mr-2 after:ml-2 w-screen mx-auto tracking-wide"
        >
          {quote.quote}
        </blockquote>
        <figcaption className="text-white">- {quote.author}</figcaption>
      </figure>
      <SymbolIcon
        className="text-white w-[1.5rem] h-[1.5rem] mx-auto hover:rotate-45 transition-transform cursor-pointer"
        onClick={handleLoadQuote}
      />
    </div>
  )
}
