"use client"

import { useEffect, useState } from "react"
import Plot, { PlotParams } from 'react-plotly.js'

export default function OurHome() {

  const data = [
    {
      country: "Russia",
      author: "Dos",
      disorder: "Schizo",
      male: "10",
      female: "5",
    },
    {
      country: "Russia",
      author: "Dos",
      disorder: "Depr",
      male: "20",
      female: "15",
    },
    {
      country: "Russia",
      author: "Pushkin",
      disorder: "Hoard",
      male: "10",
      female: "55",
    },
    {
      country: "France",
      author: "Dumas",
      disorder: "Schizo",
      male: "25",
      female: "5",
    },
    {
      country: "France",
      author: "Hugo",
      disorder: "Depr",
      male: "11",
      female: "35",
    },
    {
      country: "Germany",
      author: "Goethe",
      disorder: "Schizo",
      male: "80",
      female: "2",
    },
    {
      country: "Germany",
      author: "Kafka",
      disorder: "Hoard",
      male: "10",
      female: "45",
    },
  ]

  const allCountries = [... new Set(data.map(o => o.country))]
  const defaultCountry = allCountries[0]

  const [countrySelectedOption, setCountrySelectedOption] = useState(defaultCountry)
  const countriesItems = allCountries.map(country => 
    <option key={country}>{country}</option>
  )
  
  const allAuthorsofCountry = (country: String) => [... new Set(data.filter((o) => o.country === country).map(o => o.author))]

  const [authorSelectedOption, setAuthorSelectedOption] = useState(allAuthorsofCountry(countrySelectedOption)[0])
  const authorsItems = allAuthorsofCountry(countrySelectedOption).map(author => 
    <option key={author}>{author}</option>
  )

  useEffect(() => {
    setAuthorSelectedOption(allAuthorsofCountry(countrySelectedOption)[0])
  }, [countrySelectedOption])

  const getXY = (country: String, gender: "Female" | "Male") => {
    const objs = data.filter(o => o.country === country)
    const x = objs.map(o => o.disorder)
    const y = objs.map(o => gender === "Female" ? o.female : o.male)
    return {x:x, y:y}
  }

  const plotParams: PlotParams = {
    layout: {
      width: 640,
      height: 480,
      title: 'Distribution of Disorders by Gender in Different Countries',
      barmode: 'group',
      xaxis: { title: 'Disorder' },
      yaxis: { title: 'Count' },
    },
    data: [
      {
        ...getXY(countrySelectedOption, 'Male'),
        type: 'bar',
        name: `${countrySelectedOption} - Male`
      },
      {
        ...getXY(countrySelectedOption, 'Female'),
        type: 'bar',
        name: `${countrySelectedOption} - Female`
      }
    ]
  }

  return (
    <div>
      <select
        value={countrySelectedOption}
        onChange={e => setCountrySelectedOption(e.target.value)}>
        {countriesItems}
      </select>
      <select
        value={authorSelectedOption}
        onChange={e => setAuthorSelectedOption(e.target.value)}>
        {authorsItems}
      </select>
      <p>
        state: country: {countrySelectedOption}, author: {authorSelectedOption}
      </p>
      <Plot
        data={plotParams.data}
        layout={plotParams.layout}
      />
    </div>
  )
}