import React from 'react'
interface questions{
    question:string;
    points:string,
    difficultylevel:string
}
const QuestionTable = ({questions}:{questions:questions[]}) => {
  return (
    <table className="min-w-full mt-10 text-sm bg-white divide-y-2 divide-gray-200">
    <thead className="ltr:text-left rtl:text-right">
      <tr>
        <th className="sticky inset-y-0 invisible px-4 py-2 bg-white start-0">
          <label htmlFor="SelectAll" className="sr-only">Select All</label>

          <input
            type="checkbox"
            id="SelectAll"
            className="w-5 h-5 border-gray-300 rounded"
          />
        </th>
        <th className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap">
          Question
        </th>
        <th className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap">
          Difficulty
        </th>
        <th className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap">
          Points
        </th>
        <th className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap">
          Avg time
        </th>
      </tr>
    </thead>

    <tbody className="divide-y divide-gray-200 ">
    {
            questions.map((data,index) => <tr>
            <td className="sticky inset-y-0 px-4 py-2 bg-white start-0">
              <label className="sr-only" htmlFor="Row1">Row 1</label>
    
              <input
                className="w-5 h-5 border-gray-300 rounded"
                type="checkbox"
                id="Row1"
              />
            </td>
            <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap">
              {data.question}
            </td>
            <td className="px-4 py-2 text-gray-700 whitespace-nowrap">{data.difficultylevel}</td>
            <td className="px-4 py-2 text-gray-700 whitespace-nowrap">{data.points}</td>
            <td className="px-4 py-2 text-gray-700 whitespace-nowrap">20 mins</td>
          </tr>)
        }
    </tbody>
  </table>
  )
}

export default QuestionTable