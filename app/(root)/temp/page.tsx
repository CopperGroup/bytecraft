"use client"

import { Button } from "@/components/ui/button"
import { proceedDataToDB } from "@/lib/readJSONProducts"

const page = () => {

    const handleCLick = async () => {
        await proceedDataToDB()
    }

  return (
    <Button onClick={handleCLick}>Start</Button>
  )
}

export default page