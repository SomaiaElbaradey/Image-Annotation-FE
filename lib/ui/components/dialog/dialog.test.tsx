import React from "react";

import "@testing-library/jest-dom";
import { render, screen, fireEvent, act } from "@testing-library/react";

import Dialog from "./dialog";

// Mock the DialogRoot and DialogOpenTrigger components
jest.mock("../../primitives", () => ({
    DialogContext: {
        Provider: ({ children }: { children: React.ReactNode }) => (
            <>{children}</>
        ),
    },
    DialogRoot: ({ children, ...props }: React.PropsWithChildren<unknown>) => (
        <dialog {...props}>{children}</dialog>
    ),
    DialogOpenTrigger: ({ children }: { children: React.ReactNode }) => (
        <>{children}</>
    ),
}));

describe("Dialog Component", () => {
    it("renders trigger and dialog content", () => {
        render(
            <Dialog trigger={<button>Open Dialog</button>}>
                <div>Dialog Content</div>
            </Dialog>
        );

        expect(screen.getByText("Open Dialog")).toBeInTheDocument();
        expect(screen.getByText("Dialog Content")).toBeInTheDocument();
    });

    it("opens dialog when trigger is clicked", () => {
        render(
            <Dialog trigger={<button>Open Dialog</button>}>
                <div>Dialog Content</div>
            </Dialog>
        );

        const trigger = screen.getByText("Open Dialog");
        fireEvent.click(trigger);

        expect(screen.getByText("Dialog Content")).toBeInTheDocument();
    });

    it("closes dialog when clicking outside if closeOnMaskClick is true", () => {
        const mockClose = jest.fn();
        const { container } = render(
            <Dialog closeOnMaskClick trigger={<button>Open Dialog</button>}>
                <div>Dialog Content</div>
            </Dialog>
        );

        const dialog = container.querySelector("dialog");
        dialog!.close = mockClose;

        act(() => {
            fireEvent.click(dialog as HTMLElement);
        });

        expect(mockClose).toHaveBeenCalled();
    });

    it("does not close dialog when clicking outside if closeOnMaskClick is false", () => {
        const mockClose = jest.fn();
        const { container } = render(
            <Dialog
                closeOnMaskClick={false}
                trigger={<button>Open Dialog</button>}
            >
                <div>Dialog Content</div>
            </Dialog>
        );

        const dialog = container.querySelector("dialog");
        dialog!.close = mockClose;

        act(() => {
            fireEvent.click(dialog as HTMLElement);
        });

        expect(mockClose).not.toHaveBeenCalled();
    });

    it("forwards ref to dialog element", () => {
        const ref = React.createRef<HTMLDialogElement>();
        render(
            <Dialog ref={ref} trigger={<button>Open Dialog</button>}>
                <div>Dialog Content</div>
            </Dialog>
        );

        expect(ref.current).toBeInstanceOf(HTMLDialogElement);
    });

    it("renders without trigger", () => {
        render(
            <Dialog>
                <div>Dialog Content</div>
            </Dialog>
        );

        expect(screen.getByText("Dialog Content")).toBeInTheDocument();
    });

    it("passes additional props to DialogRoot", () => {
        render(
            <Dialog
                data-testid="custom-dialog"
                trigger={<button>Open Dialog</button>}
            >
                <div>Dialog Content</div>
            </Dialog>
        );

        expect(screen.getByTestId("custom-dialog")).toBeInTheDocument();
    });
});
