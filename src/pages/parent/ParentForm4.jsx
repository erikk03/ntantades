import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../config/AuthContext';
import { useFormContext } from '../../config/FormContext';
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from '../../config/firebase';

// Components
import ParentNavBar from '../../components/ParentNavBar';
import {  Progress } from "@nextui-org/react";
import { Form, Button } from '@nextui-org/react';
import {Breadcrumbs, BreadcrumbItem} from "@nextui-org/react";
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Input, DropdownTrigger, Dropdown, DropdownMenu, DropdownItem, Chip, User, Pagination} from "@nextui-org/react";
import { EllipsisVertical, Search, ChevronDown, Eye } from 'lucide-react';
import {Phone, Mail, Facebook, Instagram, Linkedin} from 'lucide-react';
import {Modal,ModalContent, ModalBody, ModalHeader, ModalFooter, useDisclosure} from "@nextui-org/react";
import {Popover, PopoverTrigger, PopoverContent, Link as MLink} from "@nextui-org/react";

export const columns = [
    {name: "ID", uid: "id", sortable: true},
    {name: "ΟΝΟΜΑΤΕΠΩΝΥΜΟ", uid: "name", sortable: true},
    {name: "ΗΛΙΚΙΑ", uid: "age", sortable: true},
    {name: "ΕΚΠΑΙΔΕΥΣΗ", uid: "education", sortable: true},
    {name: "ΕΜΠΕΙΡΙΑ", uid: "experience"},
    {name: "ΕΠΙΚΟΙΝΩΝΙΑ", uid: "communication"},
    {name: "ΤΟΠΟΘΕΣΙΑ ΕΡΓΑΣΙΑΣ", uid: "wlocation"},
    {name: "ΑΜΟΙΒΗ", uid: "payment"},
    {name: "ΔΙΑΘΕΣΙΜΟΤΗΤΑ", uid: "status", sortable: true},
    {name: "ΠΕΡΙΣΣΟΤΕΡΑ", uid: "actions"},
];

export const statusOptions = [
    {name: "ΔΙΑΘΕΣΙΜΟΙ", uid: "Διαθέσιμη"},
    {name: "ΑΠΑΣΧΟΛΗΜΕΝΟΙ", uid: "Απασχολημένη"},
    {name: "ΣΕ ΑΔΕΙΑ", uid: "Σε άδεια"},
];

export function capitalize(s) {
    return s ? s.charAt(0).toUpperCase() + s.slice(1).toLowerCase() : "";
}

// Helper function to calculate age or months
const calculateAge = (birthdate) => {
    if (!birthdate) return 'N/A';
    const birthDateObj = new Date(birthdate);
    const today = new Date();
  
    // Calculate the total difference in months
    const totalMonths = (today.getFullYear() - birthDateObj.getFullYear()) * 12 + (today.getMonth() - birthDateObj.getMonth());
  
    // Calculate age in years
    let age = Math.floor(totalMonths / 12);
    return `${age}  Ετών`;
};

export function formatWorkExperience(workExperience) {
    if (!workExperience || !workExperience.start || !workExperience.end) {
      return "Μη διαθέσιμες πληροφορίες.";
    }
  
    const start = workExperience.start;
    const end = workExperience.end;
  
    // Validate that both start and end dates have the required fields
    const requiredFields = ["year", "month", "day"];
    for (const field of requiredFields) {
      if (!(field in start) || !(field in end)) {
        return "Ελλειπή δεδομένα.";
      }
    }
  
    // Format dates as "DD/MM/YYYY"
    const formatDate = (date) =>
      `${String(date.day).padStart(2, "0")}/${String(date.month).padStart(2, "0")}/${date.year}`;
  
    const startDateString = formatDate(start);
    const endDateString = formatDate(end);
  
    return `${startDateString} - ${endDateString}`;
  }

const statusColorMap = {
    Διαθέσιμος: "success",
    Διαθέσιμη: "success",
    Απασχολημένος: "danger",
    Απασχολημένη: "danger",
    Άδεια: "warning",
};
  
const INITIAL_VISIBLE_COLUMNS = ["name", "education", "status", "payment", "actions"];
  

const ParentForm4 = () => {
    const { user } = useAuth();
    const { formData, updateForm } = useFormContext();
    const [ users, setNannies ] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const { isOpen, onOpen, onClose } = useDisclosure();

    const handleAction = (key, user) => {
        if (key === "view") {
            setSelectedUser(user); // Set the user to view
            onOpen();

        }
    };

    //////////////////////////
    const [filterValue, setFilterValue] = React.useState("");
    const [selectedKeys, setSelectedKeys] = React.useState(new Set([]));
    const [visibleColumns, setVisibleColumns] = React.useState(new Set(INITIAL_VISIBLE_COLUMNS));
    const [statusFilter, setStatusFilter] = React.useState("all");
    const [rowsPerPage, setRowsPerPage] = React.useState(4);
    const [sortDescriptor, setSortDescriptor] = React.useState({
      column: "age",
      direction: "ascending",
    });
    const [page, setPage] = React.useState(1);
    //////////////////////////

    const hasSearchFilter = Boolean(filterValue);

    const headerColumns = React.useMemo(() => {
        if (visibleColumns === "all") return columns;

        return columns.filter((column) => Array.from(visibleColumns).includes(column.uid));
    }, [visibleColumns]);

    const filteredItems = React.useMemo(() => {
        let filteredUsers = [...users];

        if (hasSearchFilter) {
        filteredUsers = filteredUsers.filter((user) =>
            user.name.toLowerCase().includes(filterValue.toLowerCase()),
        );
        }
        if (statusFilter !== "all" && Array.from(statusFilter).length !== statusOptions.length) {
        filteredUsers = filteredUsers.filter((user) =>
            Array.from(statusFilter).includes(user.status),
        );
        }

        return filteredUsers;
    }, [users, filterValue, statusFilter]);

    const pages = Math.ceil(filteredItems.length / rowsPerPage);

    const items = React.useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return filteredItems.slice(start, end);
    }, [page, filteredItems, rowsPerPage]);

    const sortedItems = React.useMemo(() => {
        return [...items].sort((a, b) => {
        const first = a[sortDescriptor.column];
        const second = b[sortDescriptor.column];
        const cmp = first < second ? -1 : first > second ? 1 : 0;

        return sortDescriptor.direction === "descending" ? -cmp : cmp;
        });
    }, [sortDescriptor, items]);

    const renderCell = React.useCallback((user, columnKey) => {
        const cellValue = user[columnKey];
    
        switch (columnKey) {
            case "name":
                return (
                <User
                    avatarProps={{radius: "lg", src: user?.avatar}}
                    description={user?.EMAIL}
                    name={`${user?.name} ${user?.surname}`}
                >
                    {user?.EMAIL}
                </User>
                );
            case "age":
                return (
                <div className="flex flex-col">
                    <p className="text-bold text-small capitalize">{cellValue}</p>
                    <p className="text-bold text-tiny capitalize text-default-400">{calculateAge(user?.birthdate)}</p>
                </div>
                );
            case "education":
                return (
                <div className="flex flex-col">
                    <p className="text-bold text-small capitalize">{cellValue}</p>
                    <p className="text-bold text-tiny capitalize text-default-400">{user?.activeAd?.education}</p>
                </div>
                );
            case "experience":
                return (
                <div className="flex flex-col">
                    <p className="text-bold text-small capitalize">{cellValue}</p>
                    <p className="text-bold text-tiny capitalize text-default-400">{formatWorkExperience(user?.activeAd?.workExperience)}</p>
                </div>
                );
            case "communication":
                return (
                <div className="flex flex-col">
                    <p className="text-bold text-small capitalize">{cellValue}</p>
                    <p className="text-bold text-tiny capitalize text-default-400">{user?.activeAd?.cellphone1}</p>
                </div>
                );
            case "wlocation":
                return (
                <div className="flex flex-col">
                    <p className="text-bold text-small capitalize">{cellValue}</p>
                    <p className="text-bold text-tiny capitalize text-default-400">{user?.activeAd?.placeOfWork}</p>
                </div>
                );
            case "payment":
                return (
                <div className="flex flex-col">
                    <p className="text-bold text-small capitalize">{cellValue}</p>
                    <p className="text-bold text-tiny capitalize text-default-400">{user?.activeAd?.payment}€ / Ώρα</p>
                </div>
                );
            case "status":
                return (
                <Chip className="capitalize" color={statusColorMap[user?.status]} size="sm" variant="flat">
                    {cellValue}
                </Chip>
                );
            case "actions":
                return (
                <div className="relative flex justify-end items-center gap-2">
                    <Dropdown>
                    <DropdownTrigger>
                        <Button isIconOnly size="sm" variant="light">
                        <EllipsisVertical className="text-default-300" />
                        </Button>
                    </DropdownTrigger>
                    <DropdownMenu onAction={(key) => handleAction(key, user)}>
                        <DropdownItem key="view">Προβολή</DropdownItem>
                        <DropdownItem key="edit">Επικοινωνία</DropdownItem>
                        <DropdownItem key="delete" color='danger'>Διαγραφή</DropdownItem>
                    </DropdownMenu>
                    </Dropdown>

                </div>
                );
            default:
                return cellValue;
        }
    }, []);

    const onNextPage = React.useCallback(() => {
        if (page < pages) {
          setPage(page + 1);
        }
      }, [page, pages]);
    
      const onPreviousPage = React.useCallback(() => {
        if (page > 1) {
          setPage(page - 1);
        }
      }, [page]);
    
      const onRowsPerPageChange = React.useCallback((e) => {
        setRowsPerPage(Number(e.target.value));
        setPage(1);
      }, []);
    
      const onSearchChange = React.useCallback((value) => {
        if (value) {
          setFilterValue(value);
          setPage(1);
        } else {
          setFilterValue("");
        }
      }, []);
    
      const onClear = React.useCallback(() => {
        setFilterValue("");
        setPage(1);
      }, []);
    
      const topContent = React.useMemo(() => {
        return (
          <div className="flex flex-col gap-4">
            <div className="flex justify-between gap-3 items-end">
              <Input
                isClearable
                className="w-[400px]"
                placeholder="Αναζήτηση με ονοματεπώνυμο..."
                startContent={<Search />}
                value={filterValue}
                onClear={() => onClear()}
                onValueChange={onSearchChange}
              />
              <div className="flex gap-3">
                <Dropdown>
                  <DropdownTrigger className="hidden sm:flex">
                    <Button endContent={<ChevronDown className="text-small" />} variant="flat">
                      Διαθεσιμότητα
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu
                    disallowEmptySelection
                    aria-label="Table Columns"
                    closeOnSelect={false}
                    selectedKeys={statusFilter}
                    selectionMode="multiple"
                    onSelectionChange={setStatusFilter}
                  >
                    {statusOptions.map((status) => (
                      <DropdownItem key={status.uid} className="capitalize">
                        {capitalize(status.name)}
                      </DropdownItem>
                    ))}
                  </DropdownMenu>
                </Dropdown>
                <Dropdown>
                  <DropdownTrigger className="hidden sm:flex">
                    <Button endContent={<ChevronDown className="text-small" />} variant="flat">
                      Στήλες
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu
                    disallowEmptySelection
                    aria-label="Table Columns"
                    closeOnSelect={false}
                    selectedKeys={visibleColumns}
                    selectionMode="multiple"
                    onSelectionChange={setVisibleColumns}
                  >
                    {columns.map((column) => (
                      <DropdownItem key={column.uid} className="capitalize">
                        {capitalize(column.name)}
                      </DropdownItem>
                    ))}
                  </DropdownMenu>
                </Dropdown>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-default-400 text-small">Συνολικά {users.length} επιλογές</span>
              <label className="flex items-center text-default-400 text-small">
                Σειρές ανα σελίδα:
                <select
                  className="bg-transparent outline-none text-default-400 text-small"
                  onChange={onRowsPerPageChange}
                >
                  <option value="5">5</option>
                  <option value="10">10</option>
                  <option value="15">15</option>
                </select>
              </label>
            </div>
          </div>
        );
      }, [
        filterValue,
        statusFilter,
        visibleColumns,
        onRowsPerPageChange,
        users.length,
        onSearchChange,
        hasSearchFilter,
      ]);
    
    const bottomContent = React.useMemo(() => {
        return (
          <div className="py-2 px-2 flex justify-between items-center">
            <span className="w-[30%] text-small text-default-400"></span>
            <Pagination
              isCompact
              showControls
              showShadow
              color="primary"
              page={page}
              total={pages}
              onChange={setPage}
            />
            <div className="hidden sm:flex w-[30%] justify-end gap-2">
              <Button isDisabled={pages === 1} size="sm" variant="flat" onPress={onPreviousPage}>
                Προηγούμενη
              </Button>
              <Button isDisabled={pages === 1} size="sm" variant="flat" onPress={onNextPage}>
                Επόμενη
              </Button>
            </div>
          </div>
        );
    }, [selectedKeys, items.length, page, pages, hasSearchFilter]);

    useEffect(() => {
        const fetchNanniesWithActiveAd = async () => {
            try {
                const q = query(collection(db, "users"), where("professional", "==", true));
                const querySnapshot = await getDocs(q);
    
                const fetchedNannies = await Promise.all(
                    querySnapshot.docs.map(async (doc) => {
                        const nannyData = { id: doc.id, ...doc.data() };
    
                        // Fetch active advertisement for this nanny
                        const subcollectionRef = collection(db, `users/${doc.id}/adv`);
                        const activeAdQuery = query(subcollectionRef, where("status", "==", "ΕΝΕΡΓΗ"));
                        const activeAdSnapshot = await getDocs(activeAdQuery);
    
                        const activeAd = activeAdSnapshot.docs[0]
                            ? { id: activeAdSnapshot.docs[0].id, ...activeAdSnapshot.docs[0].data() }
                            : null;
    
                        return {
                            ...nannyData,
                            activeAd,
                        };
                    })
                );
    
                setNannies(fetchedNannies);
            } catch (error) {
                console.error("Error fetching nannies with active ads:", error);
            }
        };
    
        fetchNanniesWithActiveAd();
    }, []);
    

const onSubmit = async (e) => {
    e.preventDefault();

    if (!selectedKeys.size) {
        alert("Παρακαλώ επιλέξτε έναν επιμελητή για να συνεχίσετε.");
        return;
    }

    if (!(e.currentTarget instanceof HTMLFormElement)) {
        console.error("Error: e.currentTarget is not a form element.");
        alert("Αποτυχία επιλογής επιμελητή. Παρακαλώ δοκιμάστε ξανά.");
        return;
    }

    const selectedNannyId = Array.from(selectedKeys)[0];
    const selectedNanny = users.find((nanny) => nanny.id.toString() === selectedNannyId);

    if (!selectedNanny) {
        alert("Αποτυχία επιλογής επιμελητή. Παρακαλώ δοκιμάστε ξανά.");
        return;
    }

    try {

        const nannyData = {
            ...selectedNanny
        };

        const existingFormData = JSON.parse(localStorage.getItem('form4')) || {};

        // const data = Object.fromEntries(new FormData(e.currentTarget));
        updateForm('form4', { ...existingFormData, nannyData });

        window.location.href = '/parent/applications/form5';
    } catch (error) {
        console.error("Error fetching nanny's subcollection:", error);
        alert("Αποτυχία επιλογής επιμελητή. Παρακαλώ δοκιμάστε ξανά.");
    }
};

    
    

    return (
        <div className="h-screen bg-[#F2E9EB] flex flex-col">
            {/* Navigation */}
            <ParentNavBar />

            {/* Main Content */}
            <main className="flex-grow ml-4 mr-4 rounded-lg">
                {/* Progress Bar */}
                <div className="w-full mb-2 flex flex-col items-center justify-center">
                    <Breadcrumbs className='m-1' size="sm" >
                        <BreadcrumbItem href="/parent/applications/form1">Γονέας</BreadcrumbItem>
                        <BreadcrumbItem href="/parent/applications/form2">Παιδί</BreadcrumbItem>
                        <BreadcrumbItem href="/parent/applications/form3">Πρόγραμμα</BreadcrumbItem>
                        <BreadcrumbItem href="/parent/applications/form4">Επιμελητής</BreadcrumbItem>
                    </Breadcrumbs>
                    <Progress
                        aria-label="Progress"
                        color="danger"
                        size="sm"
                        value={80}
                        className="w-1/4"
                    />
                </div>

                {/* Form Title */}
                <h1 className="text-xl font-bold text-center">
                    ΕΠΙΛΟΓΗ ΕΠΙΜΕΛΗΤΗ/ΤΡΙΑΣ
                </h1>

                {/* List of Nannies */}
                <Form onSubmit={onSubmit} className="flex flex-col">
                    {/* TABLE START */}
                    <Table
                        isHeaderSticky
                        aria-label="Επιλογή Επιμελητή"
                        bottomContent={bottomContent}
                        bottomContentPlacement="outside"
                        classNames={{
                            wrapper: "max-h-[350px]",
                        }}
                        selectedKeys={selectedKeys || formData?.form4?.nannyData?.id}
                        selectionMode="single"
                        sortDescriptor={sortDescriptor}
                        topContent={topContent}
                        topContentPlacement="outside"
                        onSelectionChange={setSelectedKeys}
                        onSortChange={setSortDescriptor}
                        >
                        <TableHeader columns={headerColumns}>
                            {(column) => (
                            <TableColumn
                                key={column.uid}
                                align={column.uid === "actions" ? "center" : "start"}
                                allowsSorting={column.sortable}
                            >
                                {column.name}
                            </TableColumn>
                            )}
                        </TableHeader>
                        <TableBody emptyContent={"Καμία Διαθέσιμη Επιλογή"} items={sortedItems}>
                            {(item) => (
                            <TableRow key={item.id}>
                                {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                            </TableRow>
                            )}
                        </TableBody>
                    </Table>
                    {/* TABLE END */}

                    {/* Form Actions */}
                    <div className="flex justify-end items-end w-full">
                        <Button variant="solid" color="default" size="sm" radius="md">
                            <Link to="/parent/applications/form3">ΠΙΣΩ</Link>
                        </Button>
                        <Button
                            type="submit"
                            variant="solid"
                            color="danger"
                            size="sm"
                            radius="md"
                            className="ml-auto"
                        >
                            ΣΥΝΕΧΕΙΑ
                        </Button>
                    </div>
                </Form>
            </main>

            {/* Modal to show selected user details */}
            <Modal isOpen={isOpen} onClose={onClose} >
                <ModalContent>
                <ModalHeader className="flex flex-col gap-1">
                    <User
                        avatarProps={{radius: "lg", src: selectedUser?.avatar}}
                        description={selectedUser?.EMAIL}
                        name={`${selectedUser?.name} ${selectedUser?.surname}`}
                    >
                        {selectedUser?.EMAIL}
                    </User>
                </ModalHeader>
                <hr/>
                <ModalBody>
                    {selectedUser ? (
                    <>
                        <p className='bg-gray-200 rounded-lg pl-1'><strong>AT:</strong> {selectedUser?.AT}</p>
                        <p className='bg-gray-200 rounded-lg pl-1'><strong>ΑΦΜ:</strong> {selectedUser?.AFM}</p>
                        <p className='bg-gray-200 rounded-lg pl-1'><strong>ΔΙΕΥΘΥΝΣΗ:</strong> {selectedUser?.activeAd?.address}, {selectedUser?.activeAd?.city} {selectedUser?.activeAd?.nomos} {selectedUser?.activeAd?.zipcode}</p>
                        <p className='flex items-center justify-between bg-gray-200 rounded-lg pl-1 pr-1'><strong>ΣΥΣΤΑΤΙΚΕΣ ΕΠΙΣΤΟΛΕΣ:</strong> {selectedUser.activeAd?.certificates?.letter} <Eye size="15px"/></p>
                        <div className='bg-gray-200 rounded-lg'><strong className='flex justify-center'>ΣΥΝΤΟΜΗ ΠΕΡΙΓΡΑΦΗ</strong> <p>{selectedUser?.activeAd?.bio}</p></div>                        
                        <div className='bg-gray-200 rounded-lg'>
                            <strong className='flex justify-center'>ΤΡΟΠΟΙ ΕΠΙΚΟΙΝΩΝΙΑΣ</strong>
                            <p className='flex items-center justify-center mt-1 mb-1 gap-2'>
                                {selectedUser?.EMAIL &&
                                    <Popover showArrow={true} color='foreground' backdrop='opaque'> 
                                        <PopoverTrigger>
                                            <Mail size="20px" className='mr-1 cursor-pointer'/>
                                        </PopoverTrigger>
                                        <PopoverContent>
                                            <MLink><p className='p-2'>{selectedUser?.EMAIL}</p></MLink>
                                        </PopoverContent>
                                    </Popover> 
                                }
                                {(selectedUser?.activeAd?.cellphone1) && 
                                    <Popover showArrow={true} color='foreground' backdrop='opaque'> 
                                        <PopoverTrigger>
                                            <Phone size="20px" className='mr-1 cursor-pointer'/>
                                        </PopoverTrigger>
                                        <PopoverContent>
                                            <p className='p-2'>{selectedUser?.activeAd?.homephone}</p>
                                            <p className='p-2'>{selectedUser?.activeAd?.cellphone1}</p>
                                            <p className='p-2'>{selectedUser?.activeAd?.cellphone2}</p>
                                        </PopoverContent>
                                    </Popover>
                                }
                                {selectedUser?.activeAd?.facebook && 
                                    <Popover showArrow={true} color='foreground' backdrop='opaque'> 
                                    <PopoverTrigger>
                                        <Facebook size="20px" className='mr-1 cursor-pointer'/>
                                    </PopoverTrigger>
                                    <PopoverContent>
                                        <MLink><p className='p-2'>@{selectedUser?.activeAd?.facebook}</p></MLink>
                                    </PopoverContent>
                                </Popover>
                                }
                                {selectedUser?.activeAd?.instagram && 
                                    <Popover showArrow={true} color='foreground' backdrop='opaque'> 
                                    <PopoverTrigger>
                                        <Instagram size="20px" className='mr-1 cursor-pointer'/>
                                    </PopoverTrigger>
                                    <PopoverContent>
                                        <MLink><p className='p-2'>@{selectedUser?.activeAd?.instagram}</p></MLink>
                                    </PopoverContent>
                                </Popover>
                                }
                                {selectedUser?.activeAd?.linkedin && 
                                    <Popover showArrow={true} color='foreground' backdrop='opaque'> 
                                    <PopoverTrigger>
                                        <Linkedin size="20px" className='mr-1 cursor-pointer'/>
                                    </PopoverTrigger>
                                    <PopoverContent>
                                        <MLink><p className='p-2'>@{selectedUser?.activeAd?.linkedin}</p></MLink>
                                    </PopoverContent>
                                </Popover>
                                }
                            </p>
                        </div>
                        <div className='bg-gray-200 rounded-lg'>

                        </div>

                    </>
                    ) : (
                    <p>Δεν έχει επιλεγεί επιμελητής/τρια.</p>
                    )}
                </ModalBody>
                </ModalContent>
            </Modal>
        </div>
    );
};

export default ParentForm4;