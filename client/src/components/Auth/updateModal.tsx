import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState, useEffect } from 'react';
import axios from 'axios';
import { BACKEND_URL } from '../../config';
import { AxiosError } from 'axios';


type UpdateInfoModalProps = {
  onClose: () => void;
  onSuccess?: () => void; // New callback prop for successful updates
  user?: {
    id: string;
    fullName: string;
    profileImageUrl?: string;
  };
};

export default function UpdateInfoModal({ onClose, onSuccess, user }: UpdateInfoModalProps) {
  const [firstName, setFirstName] = useState(() => user?.fullName?.split(' ')[0] || '');
  const [lastName, setLastName] = useState(() => user?.fullName?.split(' ').slice(1).join(' ') || '');
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Update state if user prop changes
  useEffect(() => {
    if (user?.fullName) {
      const nameParts = user.fullName.split(' ');
      setFirstName(nameParts[0] || '');
      setLastName(nameParts.slice(1).join(' ') || '');
    }
  }, [user]);
  
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("handleUpdate called");
  
    if (!user?.id) {
      console.log("User ID is missing");
      setError("User ID is missing. Please try again or contact support.");
      return;
    }
  
    setLoading(true);
    setError(null);
    
    try {
      const formData = new FormData();
      formData.append('userId', user.id);
      if (firstName) formData.append('firstName', firstName);
      if (lastName) formData.append('lastName', lastName);
      if (profileImage) formData.append('profileImage', profileImage);
  
      console.log("Sending update request...");
      const response = await axios.post(`${BACKEND_URL}/users/update`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
  
      console.log("Update successful:", response.data);
      setSuccess(true);
      
      // Wait a short time to show success message, then trigger callbacks
      setTimeout(() => {
        // Call onSuccess if provided
        if (onSuccess) {
          onSuccess();
        } else {
          // Fall back to just closing if onSuccess not provided
          onClose();
        }
      }, 1500);
    } catch (err) {
      const error = err as AxiosError; // Cast err to AxiosError

      console.error('Failed to update user:', error);
      setError(error.response?.data?.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Transition appear show={true} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
              <Dialog.Title className="text-lg font-medium mb-4">Update Profile</Dialog.Title>
              
              {error && (
                <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
                  {error}
                </div>
              )}
              
              {success && (
                <div className="mb-4 p-2 bg-green-100 text-green-700 rounded">
                  Profile updated successfully!
                </div>
              )}
              
              <form className="space-y-4" onSubmit={handleUpdate}>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                  <input
                    type="text"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full border p-2 rounded"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                  <input
                    type="text"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full border p-2 rounded"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Profile Photo</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setProfileImage(e.target.files ? e.target.files[0] : null)}
                    className="w-full border p-2 rounded"
                  />
                  {profileImage && (
                    <p className="text-sm text-green-600 mt-1">New image selected: {profileImage.name}</p>
                  )}
                  {user?.profileImageUrl && !profileImage && (
                    <div className="mt-1 flex items-center">
                      <img
                        src={`${user.profileImageUrl}?t=${new Date().getTime()}`} // Add cache-busting
                        alt="Current profile"
                        className="h-10 w-10 rounded-full object-cover"
                      />
                      <span className="ml-2 text-sm text-gray-500">Current profile image</span>
                    </div>
                  )}
                </div>

                <div className="flex justify-end space-x-3 pt-2">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading || (!firstName && !lastName && !profileImage)}
                    className="bg-blue-600 text-white px-4 py-2 rounded disabled:bg-blue-300"
                  >
                    {loading ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              </form>
            </Dialog.Panel>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}