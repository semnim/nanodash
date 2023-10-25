import { useAutoAnimate } from '@formkit/auto-animate/react'
import { HeartFilledIcon, HeartIcon, QuoteIcon, SymbolIcon } from '@radix-ui/react-icons'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Oval } from 'react-loader-spinner'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { capitalize } from '../tasks/PrioritySelect'
import { v4 as uuidv4 } from 'uuid'

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

  const pickRandomTopic = () => {
    const listIdx = Math.floor(Math.random() * (topicsList.length - 1))
    return topicsList[listIdx]
  }
  const [topic, setTopic] = useState(pickRandomTopic())
  const [quote, setQuote] = useState<QuoteAPIType | undefined>()
  const [isLoading, setIsLoading] = useState(true)

  const { setItem, getItem, remove, getItemKeys } = useLocalStorage('quote')

  const handleLoadQuote = async () => {
    setIsLoading(true)
    const newTopic = pickRandomTopic()
    setTopic(newTopic)
    const url = `https://api.api-ninjas.com/v1/quotes?category=${newTopic}`

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
  const [isQuoteFavorite, setIsQuoteFavorite] = useState(false)
  if (isLoading || !quote) {
    return (
      <div className="glass p-4 w-[85%] min-h-[150px] fixed bottom-[5%] flex justify-center items-center">
        <div className="flex justify-center">
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
      </div>
    )
  }
  const handleLikeQuote = () => {
    setItem(quote, `quote-${uuidv4()}`)
  }
  return (
    <div className="glass p-4 w-[85%] fixed bottom-[5%]" ref={parent}>
      <blockquote>
        {quote.quote.split(' ').map((word) =>
          word === topic ? (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild></TooltipTrigger>
                <TooltipContent>
                  <p>Current topic is: {topic}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ) : (
            word + ' '
          ),
        )}
      </blockquote>
      <cite>- {quote.author}</cite>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <p className="text-white absolute text-[.6rem] bottom-[10px] cursor-pointer">
              “{capitalize(topic)}” quotes
            </p>
          </TooltipTrigger>
          <TooltipContent>
            <p>Head to the settings section to choose the quote-topics you would like to see.</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <div className="flex justify-center items-center mx-auto gap-3 w-full">
        <SymbolIcon
          className="text-white w-[1.5rem] h-[1.5rem] hover:rotate-45 transition-transform cursor-pointer"
          onClick={handleLoadQuote}
        />
        <div>
          <Button
            variant="ghost"
            className="bg-transparent hover:bg-transparent"
            onClick={() => {
              setIsQuoteFavorite((prev) => {
                if (!prev) {
                  handleLikeQuote()
                } else {
                  const quoteKeys = getItemKeys()

                  quoteKeys.forEach((quoteKey) => {
                    const savedQuote = getItem(quoteKey)

                    if (savedQuote.quote === quote.quote) {
                      remove(quoteKey)
                    }
                  })
                }
                return !isQuoteFavorite
              })
            }}
          >
            {isQuoteFavorite ? (
              <HeartFilledIcon className="pulse w-[1.5rem] h-[1.5rem] cursor-pointer text-red-500 hover:scale-125" />
            ) : (
              <HeartIcon className=" text-white w-[1.5rem] h-[1.5rem] cursor-pointer hover:scale-125 hover:text-red-500" />
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}
