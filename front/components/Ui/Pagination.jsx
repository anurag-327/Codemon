export default function ({
  page,
  display = true,
  setPage,
  total,
  capacity,
  setCapacity,
}) {
  function pagehandler(i) {
    if (i >= 1 && i <= Math.ceil(total / capacity) && i != page) setPage(i);
  }
  return (
    <div className="flex flex-col justify-between w-full gap-2 px-2 mt-8 text-sm text-gray-600 md:flex-row ">
      <div className="flex flex-wrap justify-center w-full gap-2 ">
        <span
          onClick={() => pagehandler(page - 1)}
          className="px-3 py-1 border rounded-md cursor-pointer"
        >
          Prev
        </span>
        {[...Array(Math.ceil(total / capacity))].map((_, i) => {
          return (
            <span
              key={i + 1}
              onClick={() => pagehandler(i + 1)}
              className={`${
                page == i + 1 && "bg-gray-100"
              } px-3 py-1 border cursor-pointer hover:bg-gray-200 rounded-md`}
            >
              {i + 1}
            </span>
          );
        })}
        <span
          onClick={() => pagehandler(page + 1)}
          className="px-3 py-1 border rounded-md cursor-pointer"
        >
          Next
        </span>
      </div>
      {display && (
        <select
          className="py-1 px-2 border-gray-300 mx-auto text-sm border rounded-md outline-none resize-none w-[155px] "
          value={capacity}
          onChange={(e) => setCapacity(Number(e.target.value))}
        >
          <option value={10}>10 entries/page</option>
          <option value={20}>20 entries/page</option>
          <option value={25}>25 entries/page</option>
          <option value={30}>30 entries/page</option>
        </select>
      )}
    </div>
  );
}
