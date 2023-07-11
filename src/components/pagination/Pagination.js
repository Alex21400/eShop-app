import React, { useState } from 'react'
import styles from './Pagination.module.scss'

const Pagination = ({ currentPage, setCurrentPage, productsPerPage, totalProducts}) => {
  const pageNumbers = []
  const totalPages = Math.ceil(totalProducts / productsPerPage)
  // Limit the page numbers shown
  const [pageNumberLimit, setPageNumberLimit] = useState(5)
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5)
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(0)

  for(let i = 1; i <= totalPages; i++){
    pageNumbers.push(i)
  }

  // Paginate
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  // Go to Next Page
  const paginateNext = () => {
    if(currentPage < totalPages){
        setCurrentPage(currentPage + 1)
    }
    // Show next set of page numbers
    if(currentPage + 1 > maxPageNumberLimit){
        setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit)
        setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit)
    }
  }

  // Go to Prev Page
  const paginatePrev = () => {
    if(currentPage > 1){
        setCurrentPage(currentPage - 1)
    }
    // Show previous set of page numbers
    if((currentPage - 1) % pageNumberLimit === 0){
        setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit)
        setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit)
    }
  }

  return (
    <ul className={styles.pagination}>
        <li className={currentPage === pageNumbers[0] ? `${styles.hidden}` : null} onClick={paginatePrev}>Prev</li>
        {pageNumbers.map(num => {
            if(num < maxPageNumberLimit + 1 && num > minPageNumberLimit){
                return (
                    <li key={num} className={currentPage === num ? `${styles.active}` : null} onClick={() => paginate(num)}>{num}</li>
                )
            }  
        })}
        <li className={currentPage === pageNumbers.length ? `${styles.hidden}` : null} onClick={paginateNext}>Next</li>
        <p><b className={styles.page}>Page {currentPage}</b> of <b>{totalPages}</b></p>
    </ul>
  )
}

export default Pagination