import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import { XMarkIcon, PencilIcon } from '@heroicons/react/24/solid';
import { useClerk, useUser } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import UpdateInfoModal from './updateModal';

type User = {
  id: string;
  fullName: string;
  email: string;
  imageUrl: string;
};

type AccountModalProps = {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  user?: User;
  onUserUpdate?: () => void; // New callback prop
};

export default function AccountModal({ isOpen, setIsOpen, user, onUserUpdate }: AccountModalProps) {
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const { signOut } = useClerk();
  const { user: clerkUser} = useUser();
  const navigate = useNavigate();
  
  // If user prop isn't provided, use clerk user directly
  const userForDisplay = user || (clerkUser ? {
    id: clerkUser.id,
    fullName: `${clerkUser.firstName || ''} ${clerkUser.lastName || ''}`.trim(),
    email: clerkUser.primaryEmailAddress?.emailAddress || '',
    imageUrl: clerkUser.imageUrl || ''
  } : undefined);

  const handleSignOut = () => {
    signOut(() => navigate('/home'));
  };
  
  // Handle successful update
  const handleSuccessfulUpdate = () => {
    setShowUpdateModal(false);
    
    // Call the parent callback if provided
    if (onUserUpdate) {
      onUserUpdate();
    }
    
    // Force a refresh of clerk user data
    if (clerkUser) {
      clerkUser.reload();
    }
  };

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={setIsOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <Dialog.Panel className="w-full max-w-3xl transform overflow-hidden rounded-2xl bg-white p-6 text-left shadow-xl transition-all">
                <div className="flex justify-between items-center border-b pb-4 mb-4">
                  <Dialog.Title className="text-lg font-medium">Account</Dialog.Title>
                  <button onClick={() => setIsOpen(false)}>
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </div>

                <div className="flex justify-between">
                  <div className="w-3/4 pl-6 space-y-4">
                    <div className="flex items-center space-x-4">
                      {userForDisplay?.imageUrl && (
                        <img 
                          src={userForDisplay.imageUrl} 
                          alt="avatar" 
                          className="h-12 w-12 rounded-full"
                          // Add cache-busting parameter
                          key={new Date().getTime()}
                        />
                      )}
                      <div>
                        <p className="font-semibold">{userForDisplay?.fullName}</p>
                        <p className="text-sm text-gray-600">{userForDisplay?.email}</p>
                      </div>
                    </div>

                    <div>
                      <p className="font-semibold">Subscription Info</p>
                      <p className="text-sm text-gray-600">
                        You are on the Free Plan. Upgrade to access premium features.
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col justify-between items-end space-y-3">
                    <button
                      onClick={() => setShowUpdateModal(true)}
                      className="flex items-center px-3 py-1 text-sm text-blue-600 hover:underline"
                    >
                      <PencilIcon className="h-4 w-4 mr-1" />
                      Edit Info
                    </button>
                    <button
                      onClick={handleSignOut}
                      className="px-3 py-1 text-sm text-red-600 hover:underline"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              </Dialog.Panel>
            </div>
          </div>
        </Dialog>
      </Transition>

      {showUpdateModal && (
        <UpdateInfoModal 
          onClose={() => setShowUpdateModal(false)} 
          onSuccess={handleSuccessfulUpdate}
          user={clerkUser ? {
            id: clerkUser.id,
            fullName: `${clerkUser.firstName || ''} ${clerkUser.lastName || ''}`.trim(),
            profileImageUrl: clerkUser.imageUrl
          } : undefined}
        />
      )}
    </>
  );
}