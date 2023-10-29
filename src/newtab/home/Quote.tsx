import { useAutoAnimate } from '@formkit/auto-animate/react'
import { HeartFilledIcon, HeartIcon, QuoteIcon, SymbolIcon } from '@radix-ui/react-icons'
import axios from 'axios'
import { useEffect, useLayoutEffect, useMemo, useState } from 'react'
import { Oval } from 'react-loader-spinner'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { Button } from '@/components/ui/button'
import { capitalize } from '../tasks/PrioritySelect'
import { v4 as uuidv4 } from 'uuid'
import { quoteTopicList } from './quoteTopicList'
import { Topic } from '../settings/SettingsView'

export type QuoteAPIType = {
  quote: string
  author: string
  category: string
  fetchedAt: Date
  isQuoteFavorite: boolean
}
export const Quote = () => {
  const { setItem, getItem, remove, getItemKeys, getMultipleItems } = useLocalStorage('quote')
  const topicsList: Topic[] = getItem('quote-topics')
    .filter((topic: Topic) => topic.isChecked)
    .map((topic: Topic) => topic.label)

  const pickRandomTopic = () => {
    const choiceList = topicsList.length > 0 ? topicsList : quoteTopicList
    const listIdx = Math.floor(Math.random() * (choiceList.length - 1))

    return choiceList[listIdx]
  }
  const [topic, setTopic] = useState(pickRandomTopic())
  const [quote, setQuote] = useState<QuoteAPIType | undefined>()
  const [isLoading, setIsLoading] = useState(true)
  const [isPulsating, setIsPulsating] = useState(false)

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
    const quotesFromStorage = getMultipleItems()
    try {
      const quote: QuoteAPIType = {
        ...apiResult.data[0],
        fetchedAt: Date.now(),
        isQuoteFavorite: quotesFromStorage.find((qfs) => qfs.quote === apiResult.data[0].quote),
      }
      setQuote(quote)
      setItem(quote, `quote-${uuidv4()}`)
    } catch (err) {
      console.log(err)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    const fetchQuote = async () => {
      const quoteFromStorage = getMultipleItems()
        .map((saved) => ({ ...saved, fetchedAt: new Date(saved.fetchedAt) }))
        .toSorted((a, b) => {
          return a.fetchedAt === b.fetchedAt ? 0 : a.fetchedAt < b.fetchedAt ? 1 : -1
        })[0]
      if (!quoteFromStorage) {
        handleLoadQuote()
      }

      if (quoteFromStorage) {
        const hourDifference = Math.abs(Date.now() - quoteFromStorage.fetchedAt) / (1000 * 60 * 60)
        if (hourDifference < 1 && topicsList.includes(quoteFromStorage.category)) {
          setQuote(quoteFromStorage)
          setTopic(quoteFromStorage.category)
          setIsLoading(false)
          return
        } else {
          handleLoadQuote()
        }
      }
    }

    fetchQuote()
  }, [])
  const autoAnimateOptions = { duration: 750, easing: 'ease-in', onElementAdded: false }
  const autoAnimateOptionsMemoized = useMemo(() => autoAnimateOptions, [])
  const [parentCallback] = useAutoAnimate(autoAnimateOptionsMemoized)
  const [isQuoteFavorite, setIsQuoteFavorite] = useState(false)
  const handleLikeQuote = () => {
    if (!quote) {
      return
    }
    const updatedQuote = { ...quote, isQuoteFavorite: !quote.isQuoteFavorite }
    const id = getItemKeys().find((key) => {
      const savedQuote = getItem(key)

      return savedQuote.quote === quote.quote
    })
    setItem(updatedQuote, id ? id : `quote-${uuidv4()}`)
    setQuote(updatedQuote)
  }
  // isLoading: div => flex justify-center items-center

  return (
    <div
      // ref={parentCallback}
      className={`${
        (isLoading || !quote) && 'flex justify-center items-center'
      } glass p-4 max-w-[85%] min-h-[175px] h-[175px] fixed bottom-[5%] min-w-[50%] w-[1000px] transition-[height] duration-500 ease-in-out`}
    >
      {isLoading || !quote ? (
        <div className="flex justify-center w-full transition-none">
          <Oval
            height={40}
            width={40}
            color="#f1f5f9"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
            ariaLabel="oval-loading"
            secondaryColor="black"
            strokeWidth={2}
            strokeWidthSecondary={2}
          />
        </div>
      ) : (
        <>
          <div className="w-full h-full">
            <blockquote className="transition-none overflow-scroll max-h-[75%]">
              <p className="pt-3">{quote.quote}</p>
            </blockquote>
            <cite className="transition-none">- {quote.author}</cite>
            <p className="text-primary absolute text-[.6rem] bottom-[10px] transition-none">
              “{capitalize(topic)}” quotes
            </p>
          </div>
          <div className="flex justify-center items-center mx-auto gap-3 w-full absolute bottom-[5%]">
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
                {quote.isQuoteFavorite ? (
                  <HeartFilledIcon
                    onAnimationEnd={() => setIsPulsating(false)}
                    className={`${
                      isPulsating && 'pulse'
                    } w-[1.5rem] h-[1.5rem] cursor-pointer text-red-500 hover:scale-125`}
                  />
                ) : (
                  <HeartIcon
                    onClick={() => {
                      setIsPulsating(true)
                      handleLikeQuote()
                    }}
                    className=" text-white w-[1.5rem] h-[1.5rem] cursor-pointer hover:scale-125 hover:text-red-500"
                  />
                )}
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
