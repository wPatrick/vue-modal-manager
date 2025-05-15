import { ref, markRaw } from 'vue';

/**
 * Interface for modal configuration
 */
interface ModalConfig {
    id: string;
    component: any;
    props: Record<string, any>;
    visible: boolean;
    resolve: (data: any) => void;
    maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
}

// Create a singleton instance using module scope variables
const modals = ref<ModalConfig[]>([]);

/**
 * Generate a unique ID for each modal
 */
const generateId = (): string => {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9);
};

/**
 * Modal manager composable
 * Uses a singleton pattern to ensure the same modals are used across the application
 */
export function useModalManager() {
    /**
     * Open a modal and return a Promise
     * @param component The component to render in the modal
     * @param props Props to pass to the component
     * @param maxWidth Maximum width of the modal
     * @returns Promise that resolves when the modal is closed
     */
    const openModal = (
        component: any,
        props: Record<string, any> = {},
        maxWidth: 'sm' | 'md' | 'lg' | 'xl' | '2xl' = '2xl',
    ): Promise<any> => {
        const id = generateId();
        let resolveFn: (data: any) => void;
        const promise = new Promise<any>((resolve) => {
            resolveFn = resolve;
        });
        const modalConfig: ModalConfig = {
            id,
            component: markRaw(component),
            props,
            visible: true,
            maxWidth,
            resolve: resolveFn!,
        };
        modals.value.push(modalConfig);
        return promise;
    };

    /**
     * Close a modal and resolve its Promise with null
     * @param id The ID of the modal to close
     */
    const closeModal = (id: string): void => {
        const modal = modals.value.find((modal) => modal.id === id);
        if (modal) {
            modal.visible = false;
            setTimeout(() => {
                modal.resolve(null);
                modals.value = modals.value.filter((m) => m.id !== id);
            }, 200);
        }
    };

    /**
     * Close a modal and resolve its Promise with the provided data
     * @param id The ID of the modal to close
     * @param data The data to resolve the Promise with
     */
    const closeModalWithSuccess = (id: string, data: any): void => {
        const modal = modals.value.find((modal) => modal.id === id);
        if (modal) {
            modal.visible = false;
            setTimeout(() => {
                modal.resolve(data);
                modals.value = modals.value.filter((m) => m.id !== id);
            }, 200);
        }
    };

    /**
     * Close all modals and resolve their Promises with null
     */
    const closeAllModals = (): void => {
        modals.value.forEach((modal) => {
            modal.visible = false;
            setTimeout(() => {
                modal.resolve(null);
            }, 200);
        });
        setTimeout(() => {
            modals.value = [];
        }, 200);
    };

    return {
        modals,
        openModal,
        closeModal,
        closeModalWithSuccess,
        closeAllModals,
    };
}
