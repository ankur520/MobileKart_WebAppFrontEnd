import {render, screen} from "@testing-library/react"

import userEvent from "@testing-library/user-event";

import UserSignup from "./UserSignup"

describe("UserSignUp.js Testing  " , () => {

    test("Email address input should be rendered " , () => {

        render(<UserSignup />)
        
        // const elementEmail = screen.getByPlaceholderText(/email address/i)

        const elemtrn  = screen.getByRole('heading', {
            name: /user signup signin/i
          })

        expect(elemtrn).toBeInTheDocument();

    } )

    // test("password input should be rendered " , () => {

    //     render ( <UserSignup /> )
    //     screen.getByPlaceholderText(/password/i)
    //     const elementPassword = screen.getByRole('textbox', {  name: /password/i})

    //     expect(elementPassword).toBeInTheDocument();

    // } )


} )