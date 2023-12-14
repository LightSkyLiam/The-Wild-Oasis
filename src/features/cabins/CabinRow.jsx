import styled from "styled-components";
import { formatCurrency } from "../../utils/helpers";
import { useState } from "react";
import UpdateCabinForm from "./UpdateCabinForm";
import { useDeleteCabin } from "./useDeleteCabin";
import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";
import { useDuplicateCabin } from "./useDuplicateCabin";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

function CabinRow({ cabin }) {
  const [isOpenEditModal, setIsOpenEditModal] = useState(false);
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const { isDeleting, deleteCabin } = useDeleteCabin();
  const { isDuplicating, duplicateCabin } = useDuplicateCabin();
  const {
    name,
    maxCapacity,
    regularPrice,
    discount,
    image,
    imageName,
    id: cabinId,
  } = cabin;
  const handleDuplicate = () => {
    duplicateCabin({
      name: `Copy of ${name}`,
      maxCapacity,
      regularPrice,
      discount,
      image,
      imageName,
    });
  };
  return (
    <>
      <Table.Row>
        <Img src={image} />
        <Cabin>{name}</Cabin>
        <div>Fits up to {maxCapacity} guests</div>
        <Price>{formatCurrency(regularPrice)}</Price>
        {discount ? (
          <Discount>{formatCurrency(discount)}</Discount>
        ) : (
          <span> &mdash; </span>
        )}
        <div>
          <Menus.Menu>
            <Menus.Toggle type="onLight" size="small" id={cabinId} />
            <Menus.List id={cabinId}>
              <Menus.Button
                disabled={isDuplicating}
                onClick={handleDuplicate}
                icon={<HiSquare2Stack />}
              >
                Duplicate
              </Menus.Button>

              <Menus.Button
                onClick={() =>
                  setIsOpenEditModal((isOpenEditModal) => !isOpenEditModal)
                }
                icon={<HiPencil />}
              >
                Edit
              </Menus.Button>
              <Menus.Button
                disabled={isDeleting}
                onClick={() =>
                  setIsDeleteModal((isDeleteModal) => !isDeleteModal)
                }
                icon={<HiTrash />}
              >
                Delete
              </Menus.Button>
            </Menus.List>
          </Menus.Menu>
        </div>
      </Table.Row>
      {isOpenEditModal && (
        <Modal onClose={() => setIsOpenEditModal(false)}>
          <UpdateCabinForm
            onCloseModal={() => setIsOpenEditModal(false)}
            cabinToEdit={cabin}
          />
        </Modal>
      )}
      {isDeleteModal && (
        <Modal onClose={() => setIsDeleteModal(false)}>
          <ConfirmDelete
            onClose={() => setIsDeleteModal(false)}
            resourceName="cabin"
            onConfirm={() => deleteCabin({ cabinId, imageName })}
            disabled={isDeleting}
          />
        </Modal>
      )}
    </>
  );
}

export default CabinRow;
