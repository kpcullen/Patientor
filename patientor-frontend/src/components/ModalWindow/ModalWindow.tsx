import { Dialog, DialogTitle, DialogContent, Divider } from '@mui/material'

interface Props {
  modalOpen: boolean
  onClose: () => void
  children: React.ReactNode
  visit: boolean
}

const ModalWindow = ({
  modalOpen,
  onClose,
  children,
  visit = false,
}: Props) => (
  <Dialog fullWidth={true} open={modalOpen} onClose={() => onClose()}>
    <DialogTitle>Add a new {visit ? 'visit' : 'patient'}</DialogTitle>
    <Divider />
    <DialogContent>{children}</DialogContent>
  </Dialog>
)

export default ModalWindow
