'use client'

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export default function Home() {
  const [name, setName] = useState('')
  const [title, setTitle] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [location, setLocation] = useState('')
  const [copyStatus, setCopyStatus] = useState('')

  // Company website as a constant
  const website = "liquidacre.com"

  const generateSignature = () => {
    let signatureContent = `
      <table cellpadding="0" cellspacing="0" border="0" style="font-family:Arial,sans-serif;font-size:14px;line-height:1.6;color:rgb(51,51,51)">
        <tbody>
          <tr>
            <td>
              <table cellpadding="0" cellspacing="0" border="0">
                <tbody>
    `

    // Add name and title if provided
    if (name || title) {
      signatureContent += `
                  <tr>
                    <td style="padding-bottom:10px">
                      ${name ? `<strong style="color:rgb(16,24,40);font-size:16px">${name}</strong>` : ''}
                      ${name && title ? '<br>' : ''}
                      ${title ? `<span style="color:rgb(102,112,133);font-size:14px">${title}</span>` : ''}
                    </td>
                  </tr>
      `
    }

    // Add email if provided
    if (email) {
      signatureContent += `
                  <tr>
                    <td style="padding-bottom:5px">
                      <table cellpadding="0" cellspacing="0" border="0">
                        <tbody>
                          <tr>
                            <td style="padding-right:8px;vertical-align:middle">
                              <img src="https://lh3.googleusercontent.com/d/1IYy8Z172jZpVoCX2LgjruMti5JIQX_3g" alt="Email" width="16" height="16" style="display:block">
                            </td>
                            <td style="vertical-align:middle">
                              <a href="mailto:${email}" style="color:rgb(6,131,100);text-decoration-line:none;font-size:14px">${email}</a>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
      `
    }

    // Add website
    signatureContent += `
                <tr>
                  <td style="padding-bottom:5px">
                    <table cellpadding="0" cellspacing="0" border="0">
                      <tbody>
                        <tr>
                          <td style="padding-right:8px;vertical-align:middle">
                            <img src="https://lh3.googleusercontent.com/d/10UgDSAhm_hDYimyp07y6uZDGnns8p5Kt" alt="Website" width="16" height="16" style="display:block">
                          </td>
                          <td style="vertical-align:middle">
                            <a href="https://${website}" style="color:rgb(6,131,100);text-decoration-line:none;font-size:14px">${website}</a>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
    `

    // Add phone if provided
    if (phone) {
      signatureContent += `
                  <tr>
                    <td style="padding-bottom:5px">
                      <table cellpadding="0" cellspacing="0" border="0">
                        <tbody>
                          <tr>
                            <td style="padding-right:8px;vertical-align:middle">
                              <img src="https://lh3.googleusercontent.com/d/1VTqPMIoSVTNL-m54GGXNpyQEEai6cKvi" alt="Phone" width="16" height="16" style="display:block">
                            </td>
                            <td style="vertical-align:middle">
                              <span style="color:rgb(16,24,40);font-size:14px">${phone}</span>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
      `
    }

    // Add location if provided
    if (location) {
      signatureContent += `
                  <tr>
                    <td>
                      <table cellpadding="0" cellspacing="0" border="0">
                        <tbody>
                          <tr>
                            <td style="padding-right:8px;vertical-align:middle">
                              <img src="https://lh3.googleusercontent.com/d/13G5nLAXA-_ByAyKPVNqrzuoe5smdg01y" alt="Location" width="16" height="16" style="display:block">
                            </td>
                            <td style="vertical-align:middle">
                              <span style="color:rgb(16,24,40);font-size:14px">${location}</span>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
      `
    }

    // Close the tables and add the logo
    signatureContent += `
                </tbody>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding-top:15px">
              <img src="https://ci3.googleusercontent.com/mail-sig/AIorK4x7R9W4b09Vlhg2GYX_gCIp-3VTMD7Mm944IQ5TOHlfY9xdQ2uC6V6tvP1d2nL7UZIWMb1x8et9Lw60" alt="Liquidacre Logo" style="max-width:160px;height:auto;display:block">
            </td>
          </tr>
        </tbody>
      </table>
    `

    return signatureContent
  }

  const copyToClipboard = async () => {
    const signature = generateSignature()
    const plainText = signature.replace(/<[^>]+>/g, '').trim()

    try {
      if (navigator.clipboard && navigator.clipboard.write) {
        const clipboardItem = new ClipboardItem({
          'text/html': new Blob([signature], { type: 'text/html' }),
          'text/plain': new Blob([plainText], { type: 'text/plain' })
        })
        await navigator.clipboard.write([clipboardItem])
      } else {
        // Fallback for browsers that don't support the Clipboard API
        const tempElement = document.createElement('div')
        tempElement.innerHTML = signature
        document.body.appendChild(tempElement)
        const range = document.createRange()
        range.selectNodeContents(tempElement)
        const selection = window.getSelection()
        selection?.removeAllRanges()
        selection?.addRange(range)
        document.execCommand('copy')
        document.body.removeChild(tempElement)
      }
      setCopyStatus('Signature copied to clipboard!')
    } catch (err) {
      console.error('Failed to copy: ', err)
      setCopyStatus('Failed to copy signature. Please try again.')
    }

    // Clear the status message after 3 seconds
    setTimeout(() => setCopyStatus(''), 3000)
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-xl">
      <h1 className="text-2xl font-bold mb-6">Email Signature Generator</h1>
      <div className="space-y-4">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="John Doe" />
        </div>
        <div>
          <Label htmlFor="title">Title</Label>
          <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Software Engineer" />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="john@example.com" />
        </div>
        <div>
          <Label htmlFor="phone">Phone</Label>
          <Input id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+1 (123) 456-7890" />
        </div>
        <div>
          <Label htmlFor="location">Location</Label>
          <Input id="location" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="San Angelo, TX" />
        </div>
      <div className="mt-6">
        <h2 className="text-lg font-semibold mb-2">Preview:</h2>
        <div className="border p-4 rounded" dangerouslySetInnerHTML={{ __html: generateSignature() }} />
      </div>
      <Button onClick={copyToClipboard} className="w-full">Copy Signature</Button>
        {copyStatus && (
          <Alert>
            <AlertDescription>{copyStatus}</AlertDescription>
          </Alert>
        )}
      </div>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="outline" className="w-full mt-4">How to Use</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>How to Use Your New Signature</AlertDialogTitle>
            <AlertDialogDescription>
              1. Fill in your information in the form fields.<br/>
              2. Leave any fields blank that you don&apos;t want to include.<br/>
              3. Click Copy Signature to copy the HTML to your clipboard.<br/>
              4. In your email client, go to signature settings.<br/>
              5. Create a new signature or edit an existing one.<br/>
              6. Paste the copied HTML into the signature field.<br/>
              7. Save your changes in the email client.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction>Got it!</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}