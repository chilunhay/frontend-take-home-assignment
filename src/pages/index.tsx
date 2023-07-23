import { useState } from 'react'
import * as Tabs from '@radix-ui/react-tabs'

import { CreateTodoForm } from '@/client/components/CreateTodoForm'
import { TodoList } from '@/client/components/TodoList'

/**
 * QUESTION 6:
 * -----------
 * Implement quick filter/tab feature so that we can quickly find todos with
 * different statuses ("pending", "completed", or both). The UI should look like
 * the design on Figma.
 *
 * NOTE:
 *  - For this question, you must use RadixUI Tabs component. Its Documentation
 *  is linked below.
 *
 * Documentation references:
 *  - https://www.radix-ui.com/docs/primitives/components/tabs
*/
interface IStatus {
  id: number;
  value: string;
  status: ("completed" | "pending")[];
}

const StatusItem : IStatus[] = [
  {
    id: 1,
    value: "All",
    status: ["completed", "pending"]
  },
  {
    id: 2,
    value: "Pending",
    status: ["pending"]
  },
  {
    id: 3,
    value: "Completed",
    status: ["completed"]
  }
]

const Index = () => {
  const [activeTab, setActiveTab] = useState<string>(String(StatusItem[0]?.value))

  const [status, setStatus] = useState<('completed' | 'pending')[]>(['completed', 'pending'])

  const handleChange = (tab: string) => {    
    setActiveTab(tab)

    StatusItem.map((item) => {
      if (item.value === tab) {
        setStatus(item.status)
      }
    })
  }

  return (
    <main className="mx-auto w-[480px] pt-12">
      <div className="rounded-12 bg-white p-8 shadow-sm">
        <h1 className="text-center text-4xl font-extrabold text-gray-900">
          Todo App
        </h1>

        {/* Tab feature */}

        <Tabs.Root 
          defaultValue={'completed'}
          orientation="vertical"
          onValueChange={(tab:string) => handleChange(tab)}
        >
          <Tabs.List className='pt-10 flex gap-2'>
              {StatusItem?.map((item, index) => (
                <Tabs.Trigger
                  key={index}
                  className={`h-11 px-6 py-3 rounded-full border border-gray-200 justify-center items-center gap-2 inline-flex text-sm font-bold leading-tight ${
                    activeTab === item.value
                      ? 'bg-gray-700 text-white'
                      : 'text-gray-700'
                    }`
                  }
                  value={item.value}
                >
                  {item.value}
                </Tabs.Trigger>
              ))}
          </Tabs.List>
        </Tabs.Root>  

        <div className="pt-10">
          <TodoList statuses={status} />
        </div>
        <div className="pt-10">
          <CreateTodoForm />
        </div> 
      </div>
    </main>
  )
}

export default Index
