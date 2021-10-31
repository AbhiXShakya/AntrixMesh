import "./Pagination.css";
import ReactPaginate from "react-paginate";

export function Pagination({ pageCount, handlePageClick, currentPage }) {
  return (
    <div className="pagination">
      <ReactPaginate
        previousLabel={"<"}
        nextLabel={">"}
        breakLabel={"..."}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={3}
        onPageChange={handlePageClick}
        containerClassName={"pagination-container"}
        pageClassName={"page-item"}
        pageLinkClassName={"page-link"}
        previousClassName={"page-item"}
        previousLinkClassName={"page-link"}
        nextClassName={"page-item"}
        nextLinkClassName={"page-link"}
        breakClassName={"page-item"}
        breakLinkClassName={"page-link"}
        activeClassName={"page-active"}
        forcePage={currentPage ? currentPage - 1 : null}
      />
    </div>
  );
}
