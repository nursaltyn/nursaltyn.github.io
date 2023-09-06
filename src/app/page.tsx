import dynamic from 'next/dynamic'

export default function Home() {
  const DynamicComponent = dynamic(() => import('../components/plotPage'), {
    ssr: false
  })

  return (
    <div>
      asd
      <DynamicComponent />
    </div>
  )
}