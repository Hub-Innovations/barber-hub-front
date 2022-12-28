import {
  Button,
  Flex,
  Grid,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import React from 'react';
import { BsCheckCircle } from 'react-icons/bs';
import * as Styled from './style';
import useMedia from '../../../hooks/useMedia';

interface SuccessModalProps {
  open: boolean;
  modalTitle: string;
  modalMensagem: string;
  showButtonClose?: boolean;
  showActionButton?: boolean;
  actionButtonText?: string;
  actionButtonMethod: () => any;
}

function SuccessModal({
  open,
  modalTitle,
  modalMensagem,
  showButtonClose,
  showActionButton,
  actionButtonText,
  actionButtonMethod,
}: SuccessModalProps) {
  const [isOpen, setIsOpem] = React.useState(open);
  const mobile = useMedia('(max-width: 769px)');

  function handleClose() {
    setIsOpem(false);
  }

  React.useEffect(() => {
    setIsOpem(open);
  }, [open]);

  return (
    <>
      <Modal
        size={mobile ? 'xs' : 'md'}
        onClose={handleClose}
        isOpen={isOpen}
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Grid placeItems="center" mt="24px" gap="12px">
              <BsCheckCircle color="#01D281" size="64" />
              <Styled.ModalTitle>{modalTitle}</Styled.ModalTitle>
            </Grid>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Styled.ModalText>{modalMensagem}</Styled.ModalText>
          </ModalBody>
          <Grid placeItems="center" pb="20px">
            <Flex gap="20px">
              {showButtonClose && (
                <Styled.ModalButton
                  outline={true}
                  onClick={() => setIsOpem(false)}
                >
                  Fechar
                </Styled.ModalButton>
              )}
              {showActionButton && (
                <Styled.ModalButton
                  outline={false}
                  onClick={() => actionButtonMethod()}
                >
                  {actionButtonText}
                </Styled.ModalButton>
              )}
            </Flex>
          </Grid>
        </ModalContent>
      </Modal>
    </>
  );
}

export default SuccessModal;
