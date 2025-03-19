const PaginationComponent = ({ totalPages, currentPage, onPageChange }:{
    totalPages:number, currentPage:number,onPageChange:(currentPage:number) => void
}) => {
    return (
      <div className="flex items-center gap-2 mt-[3rem]">
        {/* Tombol Previous */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Previous
        </button>
  
        {/* Nomor Halaman */}
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`px-4 py-2 border rounded ${
              page === currentPage ? "bg-[#0396C7] text-white" : "bg-white"
            }`}
          >
            {page}
          </button>
        ))}
  
        {/* Tombol Next */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    );
  };
  
  export default PaginationComponent;
  