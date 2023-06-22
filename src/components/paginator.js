const Paginator = ({ page, setPage, hasPrevPage, hasNextPage }) => {
  return (
    <div className="flex justify-center mt-6 mb-10">
      { hasPrevPage && (
        <div className="pr-2">
          <button onClick={() => setPage(page - 1)}>前へ</button>
        </div>
      )}
      { hasNextPage && (
        <div className="pl-2">
          <button onClick={() => setPage(page + 1)}>次へ</button>
        </div>
      )}
    </div>
  )
}

export default Paginator;
