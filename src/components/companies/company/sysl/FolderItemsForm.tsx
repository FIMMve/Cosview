import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Radio, RadioGroup, useDisclosure } from "@nextui-org/react";

export default function FolderItemsForm({sysl, setSysl} : {sysl: any, setSysl: React.Dispatch<any>}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  return (
    <>
      <Button size="sm" className="w-full md:max-w-44 bg-primary dark:bg-secondary font-medium text-lg text-white dark:text-black" onPress={onOpen}>Editar Items</Button>
      <Modal isDismissable={false} scrollBehavior="outside" isOpen={isOpen} onOpenChange={onOpenChange} placement="center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex justify-center w-full">
                <h3>Carpeta del Servicio</h3>
              </ModalHeader>
              <ModalBody>
                <form 
                  className="flex flex-col gap-5 items-center"
                >
                  <RadioGroup
                    label="Contrato de Mancomunidad"
                    value={sysl?.folder?.community_contract}
                    onValueChange={e => setSysl({...sysl, folder: {...sysl.folder, community_contract: e}})}
                  >
                    <div className="flex gap-5">
                      <Radio value="no cumple">No cumple</Radio>
                      <Radio value="cumple">Cumple</Radio>
                    </div>
                  </RadioGroup>

                  <RadioGroup
                    label="Certificado del Servicio"
                    value={sysl?.folder?.service_certificate}
                    onValueChange={e => setSysl({...sysl, folder: {...sysl.folder, service_certificate: e}})}                  
                  >
                    <div className="flex gap-5">
                      <Radio value="no cumple">No cumple</Radio>
                      <Radio value="cumple">Cumple</Radio>
                    </div>
                  </RadioGroup>

                  <RadioGroup
                    label="Certificado de los Inspectores"
                    value={sysl?.folder?.inspectors_certificate}
                    onValueChange={e => setSysl({...sysl, folder: {...sysl.folder, inspectors_certificate: e}})}                  
                  >
                    <div className="flex gap-5">
                      <Radio value="no cumple">No cumple</Radio>
                      <Radio value="cumple">Cumple</Radio>
                    </div>
                  </RadioGroup>

                  <RadioGroup
                    label="Organigrama del Servicio"
                    value={sysl?.folder?.service_organigram}
                    onValueChange={e => setSysl({...sysl, folder: {...sysl.folder, service_organigram: e}})}
                  >
                    <div className="flex gap-5">
                      <Radio value="no cumple">No cumple</Radio>
                      <Radio value="cumple">Cumple</Radio>
                    </div>
                  </RadioGroup>

                  <RadioGroup
                    label="Normas"
                    value={sysl?.folder?.standards}
                    onValueChange={e => setSysl({...sysl, folder: {...sysl.folder, standards: e}})}
                  >
                    <div className="flex gap-5">
                      <Radio value="no cumple">No cumple</Radio>
                      <Radio value="cumple">Cumple</Radio>
                    </div>
                  </RadioGroup>

                  <RadioGroup
                    label="Políticas de SySL"
                    value={sysl?.folder?.sysl_policies}
                    onValueChange={e => setSysl({...sysl, folder: {...sysl.folder, sysl_policies: e}})}
                  >
                    <div className="flex gap-5">
                      <Radio value="no cumple">No cumple</Radio>
                      <Radio value="cumple">Cumple</Radio>
                    </div>
                  </RadioGroup>

                  <RadioGroup
                    label="Análisis de Puestos"
                    value={sysl?.folder?.job_analysis}
                    onValueChange={e => setSysl({...sysl, folder: {...sysl.folder, job_analysis: e}})}
                  >
                    <div className="flex gap-5">
                      <Radio value="no cumple">No cumple</Radio>
                      <Radio value="cumple">Cumple</Radio>
                    </div>
                  </RadioGroup>

                  <RadioGroup
                    label="Protocolo de Intervención"
                    value={sysl?.folder?.intervention_protocol}
                    onValueChange={e => setSysl({...sysl, folder: {...sysl.folder, intervention_protocol: e}})}
                  >
                    <div className="flex gap-5">
                      <Radio value="no cumple">No cumple</Radio>
                      <Radio value="cumple">Cumple</Radio>
                    </div>
                  </RadioGroup>
                </form>
              </ModalBody>
              <ModalFooter className="flex justify-center w-full">
                <Button size="sm" className="w-full md:max-w-44 bg-primary dark:bg-secondary font-medium text-lg text-white dark:text-black" onPress={onClose}>Cerrar</Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
