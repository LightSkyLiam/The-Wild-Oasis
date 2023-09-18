import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { PAGE_SIZE } from "../utils/Constants";

const StyledPagination = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const P = styled.p`
  font-size: 1.4rem;
  margin-left: 0.8rem;

  & span {
    font-weight: 600;
  }
`;

const Buttons = styled.div`
  display: flex;
  gap: 0.6rem;
`;

const PaginationButton = styled.button`
  background-color: ${(props) =>
    props.active ? " var(--color-brand-600)" : "var(--color-grey-50)"};
  color: ${(props) => (props.active ? " var(--color-brand-50)" : "inherit")};
  border: none;
  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  padding: 0.6rem 1.2rem;
  transition: all 0.3s;

  &:has(span:last-child) {
    padding-left: 0.4rem;
  }

  &:has(span:first-child) {
    padding-right: 0.4rem;
  }

  & svg {
    height: 1.8rem;
    width: 1.8rem;
  }

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`;
function Pagination({ results }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = +searchParams.get(`page`) || 1;
  const pageCount = Math.ceil(results / PAGE_SIZE);
  function nextPage() {
    searchParams.set(`page`, page === pageCount ? page : page + 1);
    setSearchParams(searchParams);
  }
  function prevPage() {
    if (page <= 1) return;
    searchParams.set(`page`, page === 1 ? page : page - 1);
    setSearchParams(searchParams);
  }
  return (
    <StyledPagination>
      <P>
        Showing <span>{(page - 1) * PAGE_SIZE}</span> to{" "}
        <span>{page === pageCount ? results : page * PAGE_SIZE - 1}</span> of{" "}
        <span>{results}</span> results
      </P>
      {pageCount >= 1 && (
        <Buttons>
          {page !== 1 && (
            <PaginationButton onClick={prevPage}>
              <HiChevronLeft /> <span> Previous </span>
            </PaginationButton>
          )}
          {page !== pageCount && (
            <PaginationButton onClick={nextPage}>
              <span> Next </span> <HiChevronRight />
            </PaginationButton>
          )}
        </Buttons>
      )}
    </StyledPagination>
  );
}

export default Pagination;
