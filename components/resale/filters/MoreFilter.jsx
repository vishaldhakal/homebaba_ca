import { useDisclosure } from "@nextui-org/react";

export const MoreFilter = ({
  washroomCountOptions,
  additonalFilterChange,
  filterState,
}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [moreFilterState, setMoreFilterState] = useState({
    Basement: filterState.Basement,
    washroom: filterState.washroom,
  });

  const _handleFilterChange = (name, value) => {
    const newFilterState = {
      ...moreFilterState,
      [name]: value,
    };
    setMoreFilterState(newFilterState);
  };

  const handleClick = (key) => {
    const foundWashroom = Object.values(washroomCount).find(
      (washroom) => washroom.name === key
    );
    _handleFilterChange("washroom", foundWashroom.value);
  };

  const isActiveWashroom = useCallback(
    (key) => {
      const foundWashroom = Object.values(washroomCount).find(
        (washroom) => washroom.name === key
      );
      return foundWashroom.value === moreFilterState.washroom;
    },
    [moreFilterState]
  );

  return (
    <div className="mr-4">
      <Button
        onPress={onOpen}
        variant="faded"
        className="capitalize px-1 min-w-10 sm:px-3 py-1 text-xs sm:text-sm h-[28px] sm:h-[34px]  bg-white rounded-full hover:shadow-md"
        size="md"
      >
        More Filter
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="xl"
        className={{
          footer: "z-[999]",
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col font-bold text-4xl gap-1">
                Filters
              </ModalHeader>
              <ModalBody>
                <div className="basement__bool">
                  <p className="mb-2">Basement</p>
                  <div className="flex gap-5">
                    <Switch
                      isSelected={moreFilterState.hasBasement}
                      onValueChange={(value) =>
                        _handleFilterChange("hasBasement", value)
                      }
                      classNames={{
                        wrapper: cn("group-data-[selected=true]:bg-black"),
                      }}
                    >
                      Finished Basement
                    </Switch>

                    <Switch
                      isSelected={moreFilterState.sepEntrance}
                      onValueChange={(value) =>
                        _handleFilterChange("sepEntrance", value)
                      }
                      classNames={{
                        wrapper: cn("group-data-[selected=true]:bg-black"),
                      }}
                    >
                      Separate Entrance
                    </Switch>
                  </div>
                </div>

                <div className="washroom__count mt-3">
                  <p className="fs-5 fs-sm-4 fw-500 mb-2">Washrooms</p>
                  <div className="flex gap-3 flex-wrap">
                    {washroomCountOptions.map((washroom, index) => {
                      return (
                        <div
                          key={index}
                          className={`border border-secondary-subtle rounded-full px-3 py-1 cursor-pointer ${
                            isActiveWashroom(washroom) ? "active-pills" : ""
                          }`}
                          onClick={() => handleClick(washroom)}
                        >
                          {washroom}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </ModalBody>
              <ModalFooter className="w-full flex">
                <Button
                  color="secondary"
                  variant="faded"
                  onPress={onClose}
                  className="w-50 dynamic"
                >
                  Close
                </Button>
                <Button
                  onPress={() => {
                    additonalFilterChange(moreFilterState);
                    onClose();
                  }}
                  className="w-50 dynamic bg-black text-white"
                >
                  Apply
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};
